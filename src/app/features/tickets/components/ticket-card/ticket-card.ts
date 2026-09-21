import { ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Ticket } from '../../models/ticket.model';

const SCROLL_PADDING = 40;

@Component({
  selector: 'app-ticket-card',
  imports: [NgClass],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketCard {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly ticket = input.required<Ticket>();

  /** Keep the focused card inside the horizontally scrolling board. */
  protected onFocus() {
    const card = this.el.nativeElement;
    const board = card.closest<HTMLElement>('.kanban-board');
    if (!board) return;

    const cardRect = card.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    if (cardRect.right > boardRect.right) {
      board.scrollBy({
        left: cardRect.right - boardRect.right + SCROLL_PADDING,
        behavior: 'smooth',
      });
    } else if (cardRect.left < boardRect.left) {
      board.scrollBy({
        left: cardRect.left - boardRect.left - SCROLL_PADDING,
        behavior: 'smooth',
      });
    }
  }
}
