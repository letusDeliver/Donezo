import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TicketCard } from '../ticket-card/ticket-card';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-kanban-column',
  imports: [NgClass, TicketCard],
  templateUrl: './kanban-column.html',
  styleUrl: './kanban-column.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumn {
  readonly title = input.required<string>();
  /** Drives the status dot colour. */
  readonly status = input.required<string>();
  readonly tickets = input<Ticket[]>([]);
  readonly loading = input(false);
}
