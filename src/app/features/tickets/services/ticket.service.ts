import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Ticket, TicketPage, TicketPriority, TicketStatus } from '../models/ticket.model';
import { TicketFilter } from '../models/ticket-filter.model';

const PAGE_SIZE = 5;

const TITLES = [
  'Investigate login issue',
  'Design system planning',
  'Setup auth module',
  'Create dashboard UI',
  'Handle API errors',
  'Sidebar responsiveness',
  'Fix routing issue',
  'Optimize performance',
  'Write unit tests',
  'Refactor state management',
];
const PRIORITIES: TicketPriority[] = ['high', 'medium', 'low'];
const ASSIGNEES = ['K', 'A', 'R', 'D'];

/** Mock tickets per column (enough to exercise pagination / infinite scroll). */
const SEED: Record<TicketStatus, number> = {
  backlog: 12,
  todo: 14,
  inprogress: 12,
  review: 16,
  done: 10,
};

function buildMockTickets(): Ticket[] {
  const tickets: Ticket[] = [];
  let seq = 100;

  for (const status of Object.keys(SEED) as TicketStatus[]) {
    for (let i = 0; i < SEED[status]; i++, seq++) {
      tickets.push({
        id: `${seq % 3 === 0 ? 'BUG' : 'TASK'}-${seq}`, // unique per ticket
        title: TITLES[seq % TITLES.length],
        status,
        priority: PRIORITIES[seq % PRIORITIES.length],
        assignee: ASSIGNEES[seq % ASSIGNEES.length],
      });
    }
  }

  return tickets;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly tickets = buildMockTickets();

  getTickets(
    status: TicketStatus,
    page: number,
    filters?: Partial<TicketFilter>,
  ): Observable<TicketPage> {
    const search = filters?.search?.toLowerCase();

    const filtered = this.tickets.filter(
      (t) =>
        t.status === status &&
        (!search || t.title.toLowerCase().includes(search)) &&
        (!filters?.priority || t.priority === filters.priority) &&
        (!filters?.type || t.id.startsWith(filters.type)) &&
        (!filters?.assignee || t.assignee === filters.assignee),
    );

    const start = (page - 1) * PAGE_SIZE;

    return of<TicketPage>({
      data: filtered.slice(start, start + PAGE_SIZE),
      hasMore: start + PAGE_SIZE < filtered.length,
    }).pipe(delay(500)); // simulate API latency
  }
}
