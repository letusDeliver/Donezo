import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryService } from '../../services/user-story.service';
import { UserStory } from '../../models/user-story.model';
import { AddStoryModal } from '../../components/add-story-modal/add-story-modal';
import { Router } from '@angular/router';
import { StoryDetail } from '../../components/story-detail/story-detail';

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, AddStoryModal, StoryDetail],
  templateUrl: './user-stories.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './user-stories.scss',
})
export class UserStories {
  private storyService = inject(StoryService);
  private router: Router = inject(Router);

  stories: UserStory[] = [];
  selectedStory: UserStory | null = null;
  show_create_story_modal = false;
  loading = true;
  search = '';

  show_story_details_modal: boolean = false;
  selected_story_details: UserStory | null = null;

  ngOnInit() {
    this.storyService.getUserStories().then((data) => {
      this.stories = data;
      this.loading = false;
    });
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

  deleteStory(id: number) {
    this.stories = this.stories.filter((s) => s.id !== id);
  }

  openNew() {
    this.selectedStory = {
      id: Date.now(),
      title: '',
      description: '',
      status: 'backlog',
      priority: 'medium',
      assignee: { name: 'Kunal' },
      storyPoints: 0,
      createdAt: new Date(),
    };

    this.show_create_story_modal = true;
  }

  editStory(story: UserStory) {
    this.selectedStory = { ...story };
    this.show_create_story_modal = true;
  }

  handleSave(story: UserStory) {
    const index = this.stories.findIndex((s) => s.id === story.id);

    if (index > -1) {
      this.stories[index] = story;
    } else {
      this.stories.push(story);
    }

    this.show_create_story_modal = false;
  }

  createWithAi() {
    this.router.navigate(['user-stories/create-with-ai']);
  }

  viewStory(event: any) {
    this.show_story_details_modal = true;
    this.selected_story_details = event;
  }

  editStoryFromModal(story: UserStory) {
    this.show_story_details_modal = false;
    this.editStory(story);
  }
}
