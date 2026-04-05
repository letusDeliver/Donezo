import { Component, inject } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryService } from '../../services/user-story.service';
import { UserStory } from '../../models/user-story.model';
import { AddStoryModal } from '../../components/add-story-modal/add-story-modal';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, AddStoryModal],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
})
export class UserStories {
  private storyService = inject(StoryService);
  private router: Router = inject(Router);

  stories: UserStory[] = [];
  selectedStory: UserStory | null = null;
  showDialog = false;
  loading = true;
  search = '';

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
      assignee: {name: 'Kunal'},
      storyPoints: 0,
      createdAt: new Date(),
    };

    this.showDialog = true;
  }

  editStory(story: UserStory) {
    this.selectedStory = { ...story };
    this.showDialog = true;
  }

  handleSave(story: UserStory) {
    const index = this.stories.findIndex((s) => s.id === story.id);

    if (index > -1) {
      this.stories[index] = story;
    } else {
      this.stories.push(story);
    }

    this.showDialog = false;
  }

  createWithAi(){
    this.router.navigate(['user-stories/create-with-ai']);
  }
}
