import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { KanbanColumn } from '../../components/kanban-column/kanban-column';
import { debounceTime, Subject } from 'rxjs';
import { TicketFilter } from '../../models/ticket-filter.model';
import { TicketFilters } from '../../components/ticket-filters/ticket-filters';

@Component({
  standalone: true,
  selector: 'app-kanban-board',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, KanbanColumn, TicketFilters],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
})
export class KanbanBoard {
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
  }

  /* 🔥 Initialize all columns */
  initializeColumns() {
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = {
        data: [],
        page: 1,
        loading: false,
        hasMore: true,
      };

      this.loadTickets(col.key);
    });
  }

  /* 🔥 Load tickets per column */
  loadTickets(status: string) {
    const col = this.columnsData[status];

    if (col.loading || !col.hasMore) return;

    col.loading = true;

    this.ticketService.getTickets(status, col.page, this.filters).subscribe((res) => {
      col.data = [...col.data, ...res.data];
      col.page++;
      col.hasMore = res.hasMore;
      col.loading = false;
    });
  }

  /* 🔥 Handle filters from child */
  applyFilters(filters: TicketFilter) {
    this.filters = filters;

    // Reset all columns
    this.statuses.forEach((col) => {
      this.columnsData[col.key] = {
        data: [],
        page: 1,
        loading: false,
        hasMore: true,
      };

      this.loadTickets(col.key);
    });
  }
}
