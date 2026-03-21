import { Component, ElementRef, Input } from '@angular/core';
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

  constructor(private el: ElementRef){}

  onFocus() {
    const card = this.el.nativeElement;

    // 🔥 find horizontal scroll container
    const board = card.closest('.kanban-board');

    if (!board) return;

    const cardRect = card.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const offset = 40; // padding

    // 👉 if card is out of right viewport
    if (cardRect.right > boardRect.right) {
      board.scrollBy({
        left: cardRect.right - boardRect.right + offset,
        behavior: 'smooth',
      });
    }

    // 👉 if card is out of left viewport
    else if (cardRect.left < boardRect.left) {
      board.scrollBy({
        left: cardRect.left - boardRect.left - offset,
        behavior: 'smooth',
      });
    }
  }
}
