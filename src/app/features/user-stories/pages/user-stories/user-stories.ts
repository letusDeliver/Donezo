import { Component, OnInit } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryService } from '../../services/story.service';
import { StoryView } from '../../components/story-view/story-view';

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, StoryView],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
})
export class UserStories implements OnInit {
  stories: any[] = [];
  loading = false;

  view: 'list' | 'card' = 'list';

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.loadStories();
  }

  setView(mode: 'list' | 'card') {
    this.view = mode;
  }

  loadStories() {
    this.loading = true;

    this.storyService.getStories().subscribe({
      next: (res) => {
        this.stories = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadMore() {
    if (this.loading) return;

    this.loading = true;

    this.storyService.loadMoreStories().subscribe({
      next: (res) => {
        this.stories = [...this.stories, ...res];
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
