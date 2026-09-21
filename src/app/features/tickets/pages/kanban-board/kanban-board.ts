import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { KanbanColumn } from '../../components/kanban-column/kanban-column';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { TicketFilter } from '../../models/ticket-filter.model';
import { TicketFilters } from '../../components/ticket-filters/ticket-filters';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  standalone: true,
  selector: 'app-kanban-board',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, KanbanColumn, TicketFilters],
  templateUrl: './kanban-board.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<TicketFilter>();

  statuses = [
    { label: 'Backlog', key: 'backlog' },
    { label: 'Todo', key: 'todo' },
    { label: 'In Progress', key: 'inprogress' },
    { label: 'Review', key: 'review' },
    { label: 'Done', key: 'done' },
  ];

  columnsData: Record<
    string,
    {
      data: Ticket[];
      page: number;
      loading: boolean;
      hasMore: boolean;
    }
  > = {};

  filters: TicketFilter = {
    search: '',
    priority: '',
    type: '',
    assignee: '',
  };

  constructor(
    private ticketService: TicketService,
    private scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.initializeColumns();

    /* FILTER HANDLING */
    this.filterSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((filters) => {
      this.filters = filters;
      this.resetAndReload();
    });

    /* MAIN SCROLL LISTENER */
    this.scrollService.scroll$.pipe(takeUntil(this.destroy$)).subscribe((pos) => {
      this.handleScroll(pos);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const el = document.querySelector('.kanban-board') as HTMLElement;

      if (!el) return;

      // only if horizontal scroll exists
      if (el.scrollWidth > el.clientWidth) {
        el.scrollTo({ left: 80, behavior: 'smooth' });

        setTimeout(() => {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        }, 600);
      }

      // existing auto load fix (keep this)
      this.checkAndFillScreen();
    }, 800);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* INITIAL LOAD */
  initializeColumns() {
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = this.getInitialColumnState();
      this.loadTickets(col.key);
    });
  }

  resetAndReload() {
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = this.getInitialColumnState();
      this.loadTickets(col.key);
    });

    setTimeout(() => this.checkAndFillScreen(), 300); // important
  }

  getInitialColumnState() {
    return {
      data: [],
      page: 1,
      loading: false,
      hasMore: true,
    };
  }

  /* API CALL */
  loadTickets(status: string) {
    const col = this.columnsData[status];

    if (!col || col.loading || !col.hasMore) return;

    col.loading = true;

    this.ticketService
      .getTickets(status, col.page, this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          col.data = [...col.data, ...(res?.data || [])];
          col.page++;
          col.hasMore = res?.hasMore ?? false;
          col.loading = false;

          // FIX: ensure viewport fills
          setTimeout(() => this.checkAndFillScreen(), 100);
        },
        error: () => {
          col.loading = false;
        },
      });
  }

  applyFilters(filters: TicketFilter) {
    this.filterSubject.next(filters);
  }

  /* SCROLL LOGIC */
  handleScroll(pos: { scrollTop: number; clientHeight: number; scrollHeight: number }) {
    const threshold = 150;

    if (pos.scrollTop + pos.clientHeight >= pos.scrollHeight - threshold) {
      this.statuses.forEach((col) => {
        this.loadTickets(col.key);
      });
    }
  }

  /* MAIN FIX: AUTO LOAD IF NO SCROLL */
  checkAndFillScreen() {
    const container = document.querySelector('.content-area') as HTMLElement;

    if (!container) return;

    const isScrollable = container.scrollHeight > container.clientHeight;

    if (!isScrollable) {
      let loaded = false;

      this.statuses.forEach((col) => {
        const column = this.columnsData[col.key];

        if (column.hasMore && !column.loading) {
          this.loadTickets(col.key);
          loaded = true;
        }
      });

      // Continue until scroll appears or no more data
      if (loaded) {
        setTimeout(() => this.checkAndFillScreen(), 300);
      }
    }
  }
}
