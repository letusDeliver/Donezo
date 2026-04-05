import { Routes } from '@angular/router';
import { UserStories } from './pages/user-stories/user-stories';
import { CreateStoryAi } from './pages/create-story-ai/create-story-ai';

export const USER_STORIES_ROUTES: Routes = [
  { path: '', component: UserStories },
  { path: 'create-with-ai', component: CreateStoryAi },
];
