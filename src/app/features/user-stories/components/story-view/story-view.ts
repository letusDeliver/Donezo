import { Component, Input } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryCard } from '../story-card/story-card';
import { UiState } from '../ui-state/ui-state';

@Component({
  standalone: true,
  selector: 'app-story-view',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, StoryCard, UiState],
  templateUrl: './story-view.html',
  styleUrl: './story-view.scss',
})
export class StoryView {
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() view: 'list' | 'card' = 'list';
  @Input() loadMore!: () => void;

  onScroll(event: any) {
    const el = event.target;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      if (!this.loading && this.loadMore) {
        this.loadMore();
      }
    }
  }
}
