export interface UserStory {
  id: number;
  title: string;
  description: string;
  status: 'backlog' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: { name: string };
  storyPoints: number;
  createdAt: Date;
}
