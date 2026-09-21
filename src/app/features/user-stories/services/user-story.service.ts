import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { UserStory } from '../models/user-story.model';

@Injectable({ providedIn: 'root' })
export class StoryService {
  getUserStories(): Observable<UserStory[]> {
    return of<UserStory[]>([
      {
        id: 1,
        title: 'Login Page UI',
        description: 'Create responsive login UI',
        status: 'backlog',
        priority: 'high',
        assignee: { name: 'Kunal' },
        storyPoints: 5,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'JWT Authentication',
        description: 'Implement auth with interceptor',
        status: 'in-progress',
        priority: 'high',
        assignee: { name: 'Rahul' },
        storyPoints: 8,
        createdAt: new Date(),
      },
    ]).pipe(delay(300)); // simulate API latency
  }
}
