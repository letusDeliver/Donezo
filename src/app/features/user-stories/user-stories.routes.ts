import { Routes } from '@angular/router';
import { UserStories } from './pages/user-stories/user-stories';
import { CreateStoryAi } from './pages/create-story-ai/create-story-ai';

// user-stories.route.ts
export const USER_STORIES_ROUTES: Routes = [
  { path: '', component: UserStories, data: { breadcrumb: 'User Stories' } },
  { path: 'create-with-ai', component: CreateStoryAi, data: { breadcrumb: 'AI Story Creator' } },
];
