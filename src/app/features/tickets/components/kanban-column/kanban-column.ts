import { Component, Input } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
// import { Ticket } from '../../models/ticket.model';
import { TicketCard } from '../ticket-card/ticket-card';
import { Ticket } from '../../models/ticket.model';

@Component({
  standalone: true,
  selector: 'app-kanban-column',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, TicketCard],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.scss',
})
export class KanbanColumn {
  @Input() title!: string;
  @Input() tickets: Ticket[] = [];
  @Input() status!: string;
  @Input() loadMore!: (status: string) => void;
  @Input() loading: boolean = false;

  onScroll(event: any) {
    const el = event.target;
    const threshold = 50;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
      this.loadMore(this.status);
    }
  }
}
