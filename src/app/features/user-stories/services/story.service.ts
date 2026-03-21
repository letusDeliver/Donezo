import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoryService {
  private projects = ['Auth System', 'Admin Panel', 'Payments'];
  private priorities = ['High', 'Medium', 'Low'];
  private statuses = ['Backlog', 'Todo', 'In Progress', 'Done'];

  generateFakeData(count = 12) {
    return Array.from({ length: count }).map(() => ({
      id: Math.floor(Math.random() * 1000),
      title: 'Build user authentication flow',
      description: 'As a user, I want secure login so that my data remains protected.',
      project: this.projects[Math.floor(Math.random() * this.projects.length)],
      priority: this.priorities[Math.floor(Math.random() * this.priorities.length)],
      status: this.statuses[Math.floor(Math.random() * this.statuses.length)],
      assignee: ['K', 'A', 'R'][Math.floor(Math.random() * 3)],
    }));
  }

  getStories() {
    return of(this.generateFakeData());
  }

  loadMoreStories() {
    return of(this.generateFakeData());
  }
}
