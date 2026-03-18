import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { KanbanColumn } from '../../components/kanban-column/kanban-column';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { TicketFilter } from '../../models/ticket-filter.model';
import { TicketFilters } from '../../components/ticket-filters/ticket-filters';

@Component({
  standalone: true,
  selector: 'app-kanban-board',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, KanbanColumn, TicketFilters],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard implements OnInit, OnDestroy {
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

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.initializeColumns();

    // 🔥 Debounce filter changes (smooth UX)
    this.filterSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((filters) => {
      this.filters = filters;
      this.resetAndReload();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* 🔥 Initialize all columns */
  initializeColumns() {
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = this.getInitialColumnState();
      this.loadTickets(col.key);
    });
  }

  /* 🔁 Reset columns */
  resetAndReload() {
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = this.getInitialColumnState();
      this.loadTickets(col.key);
    });
  }

  /* 🧱 Initial state */
  getInitialColumnState() {
    return {
      data: [],
      page: 1,
      loading: false,
      hasMore: true,
    };
  }

  /* 🔥 Load tickets per column */
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
        },
        error: () => {
          col.loading = false;
        },
      });
  }

  /* 🔥 Handle filters (debounced) */
  applyFilters(filters: TicketFilter) {
    this.filterSubject.next(filters);
  }
}
