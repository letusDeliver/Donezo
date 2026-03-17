import { Routes } from '@angular/router';
import { ProjectList } from './pages/project-list/project-list';
import { ProjectEdit } from './pages/project-edit/project-edit';
import { UserStories } from './pages/user-stories/user-stories';

export const PROJECT_ROUTES: Routes = [
  { path: '', component: ProjectList },
  { path: 'add', component: ProjectEdit },
  { path: 'edit/:id', component: ProjectEdit },
  { path: 'user-stories', component: UserStories },
];
