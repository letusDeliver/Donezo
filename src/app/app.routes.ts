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
    path: '**',
    redirectTo: 'dashboard',
  },
];
