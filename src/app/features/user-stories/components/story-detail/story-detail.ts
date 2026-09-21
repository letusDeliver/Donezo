import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UserStory, prioritySeverity, statusSeverity } from '../../models/user-story.model';

@Component({
  selector: 'app-story-detail',
  imports: [DatePipe, DialogModule, TagModule, ButtonModule],
  templateUrl: './story-detail.html',
  styleUrl: './story-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryDetail {
  readonly visible = input(false);
  readonly story = input<UserStory | null>(null);

  readonly closed = output<void>();
  readonly edit = output<UserStory>();

  protected readonly statusSeverity = statusSeverity;
  protected readonly prioritySeverity = prioritySeverity;

  protected onEdit() {
    const story = this.story();
    if (story) this.edit.emit(story);
  }
}
