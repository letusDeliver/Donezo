import { UserStory } from '../models/user-story.model';

export interface ValidationErrors {
  [key: string]: string;
}

export function validateUserStory(story: UserStory): ValidationErrors {
  const errors: ValidationErrors = {};

  // Title
  if (!story.title || story.title.trim().length < 3) {
    errors['title'] = 'Title must be at least 3 characters';
  }

  // Description
  if (!story.description || story.description.trim().length < 5) {
    errors['description'] = 'Description must be at least 5 characters';
  }

  // Assignee
  if (!story.assignee || !story.assignee.name) {
    errors['assignee'] = 'Assignee is required';
  }

  // Status
  if (!story.status) {
    errors['status'] = 'Status is required';
  }

  // Priority
  if (!story.priority) {
    errors['priority'] = 'Priority is required';
  }

  // Story Points
  if (story.storyPoints == null || story.storyPoints < 0) {
    errors['storyPoints'] = 'Story points must be 0 or more';
  }

  return errors;
}
