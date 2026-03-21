import { Component, OnInit } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryService } from '../../services/story.service';
import { StoryCard } from '../../components/story-card/story-card';

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, StoryCard],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
})
export class UserStories implements OnInit {
  stories: any[] = [];
  loading = false;

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.loadStories();
  }

  /* Initial Load */
  loadStories() {
    this.loading = true;

    this.storyService.getStories().subscribe({
      next: (res) => {
        this.stories = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /* Lazy load for virtual scroll */
  onLazyLoad(event: any) {
    // event.first = start index
    // event.rows = number of items requested

    // Optional: you can optimize using event values
    this.loadMore();
  }

  /* Load More Data */
  loadMore() {
    if (this.loading) return;

    this.loading = true;

    this.storyService.loadMoreStories().subscribe({
      next: (res) => {
        this.stories = [...this.stories, ...res];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  trackById(index: number, item: any) {
    return item.id;
  }
}
