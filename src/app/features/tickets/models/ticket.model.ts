export interface Ticket {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'inprogress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
}
