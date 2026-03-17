import { Routes } from '@angular/router';
import { KanbanBoard } from './pages/kanban-board/kanban-board';

export const TICKET_ROUTES: Routes = [
  {
    path: '',
    component: KanbanBoard,
  },
];
