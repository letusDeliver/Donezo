import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/project.routes').then((m) => m.PROJECT_ROUTES),
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/ticket.routes').then((m) => m.TICKET_ROUTES),
  },
  {
    path: 'user-stories',
    loadChildren: () =>
      import('./features/user-stories/user-stories.routes').then((m) => m.USER_STORIES_ROUTES),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
