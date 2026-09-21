export type StoryStatus = 'backlog' | 'to-do' | 'in-progress' | 'review' | 'done';
export type StoryPriority = 'high' | 'medium' | 'low';

export interface Assignee {
  name: string;
}

export interface UserStory {
  id: number;
  title: string;
  description: string;
  status: StoryStatus;
  priority: StoryPriority;
  assignee: Assignee;
  storyPoints: number;
  createdAt: Date;
}

export type TagSeverity = 'info' | 'warn' | 'success' | 'danger' | 'secondary';

export function statusSeverity(status: StoryStatus): TagSeverity {
  switch (status) {
    case 'backlog':
      return 'info';
    case 'in-progress':
      return 'warn';
    case 'done':
      return 'success';
    default:
      return 'secondary';
  }
}

export function prioritySeverity(priority: StoryPriority): TagSeverity {
  switch (priority) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warn';
    case 'low':
      return 'success';
  }
}
