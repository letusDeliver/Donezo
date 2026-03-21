import { Component, Input } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
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
  @Input() loading: boolean = false;

  // 🔥 Needed for dynamic color
  @Input() status!: string;

  trackById(index: number, item: Ticket) {
    return item.id + index;
  }
}