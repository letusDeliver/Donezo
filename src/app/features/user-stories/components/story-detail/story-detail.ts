import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { UserStory } from '../../models/user-story.model';

@Component({
  standalone: true,
  selector: 'app-story-detail',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './story-detail.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './story-detail.scss',
})
export class StoryDetail {
  @Input() visible: boolean = false;
  @Input() storyDetails: UserStory | null = null;

  @Output() close_story_detail_modal = new EventEmitter<void>();
  @Output() edit_story = new EventEmitter<UserStory>();

  closeStoryDetails() {
    this.close_story_detail_modal.emit();
  }

  onEdit() {
    if (this.storyDetails) {
      this.edit_story.emit(this.storyDetails);
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'backlog':
        return 'info';
      case 'in-progress':
        return 'warn';
      case 'done':
        return 'success';
      default:
        return null;
    }
  }

  getPrioritySeverity(priority: string) {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warn';
      case 'low':
        return 'success';
      default:
        return null;
    }
  }
}
