import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { StoryService } from '../../services/user-story.service';
import { UserStory, prioritySeverity, statusSeverity } from '../../models/user-story.model';
import { AddStoryModal } from '../../components/add-story-modal/add-story-modal';
import { StoryDetail } from '../../components/story-detail/story-detail';

const newStory = (): UserStory => ({
  id: Date.now(),
  title: '',
  description: '',
  status: 'backlog',
  priority: 'medium',
  assignee: { name: 'Kunal' },
  storyPoints: 0,
  createdAt: new Date(),
});

@Component({
  selector: 'app-user-stories',
  imports: [
    DatePipe,
    TableModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    AddStoryModal,
    StoryDetail,
  ],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserStories {
  private readonly storyService = inject(StoryService);
  private readonly router = inject(Router);

  protected readonly stories = signal<UserStory[]>([]);
  protected readonly loading = signal(true);

  protected readonly editorOpen = signal(false);
  protected readonly editedStory = signal<UserStory | null>(null);

  protected readonly detailOpen = signal(false);
  protected readonly detailStory = signal<UserStory | null>(null);

  protected readonly statusSeverity = statusSeverity;
  protected readonly prioritySeverity = prioritySeverity;

  constructor() {
    this.storyService
      .getUserStories()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        this.stories.set(data);
        this.loading.set(false);
      });
  }

  protected openNew() {
    this.editedStory.set(newStory());
    this.editorOpen.set(true);
  }

  protected editStory(story: UserStory) {
    this.editedStory.set({ ...story });
    this.editorOpen.set(true);
  }

  protected deleteStory(id: number) {
    this.stories.update((list) => list.filter((s) => s.id !== id));
  }

  protected handleSave(story: UserStory) {
    this.stories.update((list) =>
      list.some((s) => s.id === story.id)
        ? list.map((s) => (s.id === story.id ? story : s))
        : [...list, story],
    );
    this.editorOpen.set(false);
  }

  protected viewStory(story: UserStory) {
    this.detailStory.set(story);
    this.detailOpen.set(true);
  }

  protected editStoryFromDetail(story: UserStory) {
    this.detailOpen.set(false);
    this.editStory(story);
  }

  protected createWithAi() {
    this.router.navigate(['user-stories/create-with-ai']);
  }
}
