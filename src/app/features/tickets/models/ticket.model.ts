export type TicketStatus = 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
}

export interface TicketPage {
  data: Ticket[];
  hasMore: boolean;
}
