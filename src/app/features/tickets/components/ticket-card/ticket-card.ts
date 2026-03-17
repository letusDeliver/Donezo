import { Component, Input } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  selector: 'app-ticket-card',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  @Input() ticket!: Ticket;
}
