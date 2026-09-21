import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Injector,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { Ticket, TicketStatus } from '../../models/ticket.model';
import { TicketFilter } from '../../models/ticket-filter.model';
import { KanbanColumn } from '../../components/kanban-column/kanban-column';
import { TicketFilters } from '../../components/ticket-filters/ticket-filters';
import { ScrollPosition, ScrollService } from '../../../../core/services/scroll.service';

interface ColumnState {
  data: Ticket[];
  page: number;
  loading: boolean;
  hasMore: boolean;
}

type ColumnsState = Record<TicketStatus, ColumnState>;

const SCROLL_THRESHOLD = 150;
const FILTER_DEBOUNCE_MS = 300;

const initialColumn = (): ColumnState => ({ data: [], page: 1, loading: false, hasMore: true });

@Component({
  selector: 'app-kanban-board',
  imports: [KanbanColumn, TicketFilters],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard {
  private readonly ticketService = inject(TicketService);
  private readonly scrollService = inject(ScrollService);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly statuses: { label: string; key: TicketStatus }[] = [
    { label: 'Backlog', key: 'backlog' },
    { label: 'Todo', key: 'todo' },
    { label: 'In Progress', key: 'inprogress' },
    { label: 'Review', key: 'review' },
    { label: 'Done', key: 'done' },
  ];

  protected readonly columns = signal<ColumnsState>(this.emptyColumns());

  private filters: TicketFilter = { search: '', priority: '', type: '', assignee: '' };

  private readonly filter$ = new Subject<TicketFilter>();
  /** Emits when filters change so in-flight requests for the old filters are dropped. */
  private readonly reset$ = new Subject<void>();

  constructor() {
    this.loadAll();

    this.filter$
      .pipe(debounceTime(FILTER_DEBOUNCE_MS), takeUntilDestroyed())
      .subscribe((filters) => {
        this.filters = filters;
        this.reset$.next();
        this.columns.set(this.emptyColumns());
        this.loadAll();
      });

    this.scrollService.scroll$
      .pipe(takeUntilDestroyed())
      .subscribe((pos) => this.onScroll(pos));

    // One-off horizontal scroll hint once the board is rendered.
    afterNextRender(() => this.hintHorizontalScroll());
  }

  protected applyFilters(filters: TicketFilter) {
    this.filter$.next(filters);
  }

  private emptyColumns(): ColumnsState {
    return {
      backlog: initialColumn(),
      todo: initialColumn(),
      inprogress: initialColumn(),
      review: initialColumn(),
      done: initialColumn(),
    };
  }

  private patchColumn(status: TicketStatus, patch: Partial<ColumnState>) {
    this.columns.update((cols) => ({ ...cols, [status]: { ...cols[status], ...patch } }));
  }

  private loadAll() {
    this.statuses.forEach(({ key }) => this.loadTickets(key));
  }

  private loadTickets(status: TicketStatus) {
    const col = this.columns()[status];
    if (col.loading || !col.hasMore) return;

    this.patchColumn(status, { loading: true });

    this.ticketService
      .getTickets(status, col.page, this.filters)
      .pipe(takeUntil(this.reset$), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          const current = this.columns()[status];
          this.patchColumn(status, {
            data: [...current.data, ...res.data],
            page: current.page + 1,
            hasMore: res.hasMore,
            loading: false,
          });
          // Once the new cards are rendered, make sure the page is actually scrollable.
          afterNextRender(() => this.fillViewport(), { injector: this.injector });
        },
        error: () => this.patchColumn(status, { loading: false }),
      });
  }

  private onScroll(pos: ScrollPosition) {
    if (pos.scrollTop + pos.clientHeight >= pos.scrollHeight - SCROLL_THRESHOLD) {
      this.loadAll();
    }
  }

  /** Keep loading while there's more data but nothing to scroll (tall screens). */
  private fillViewport() {
    const container = this.document.querySelector<HTMLElement>('.content-area');
    if (!container || container.scrollHeight > container.clientHeight) return;

    this.loadAll();
  }

  private hintHorizontalScroll() {
    const board = this.document.querySelector<HTMLElement>('.kanban-board');
    if (!board || board.scrollWidth <= board.clientWidth) return;

    board.scrollTo({ left: 80, behavior: 'smooth' });
    const timer = setTimeout(() => board.scrollTo({ left: 0, behavior: 'smooth' }), 600);
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
