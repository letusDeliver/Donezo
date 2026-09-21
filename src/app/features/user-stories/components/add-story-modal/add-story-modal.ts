import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import {
  Assignee,
  StoryPriority,
  StoryStatus,
  UserStory,
} from '../../models/user-story.model';

@Component({
  selector: 'app-add-story-modal',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    AutoCompleteModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './add-story-modal.html',
  styleUrl: './add-story-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddStoryModal {
  private readonly fb = inject(NonNullableFormBuilder);

  /** Two-way bindable: `[(visible)]`. */
  readonly visible = model(false);
  readonly story = input<UserStory | null>(null);
  readonly save = output<UserStory>();

  protected readonly statusOptions: { label: string; value: StoryStatus }[] = [
    { label: 'Backlog', value: 'backlog' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
    { label: 'To Do', value: 'to-do' },
    { label: 'Review', value: 'review' },
  ];

  protected readonly priorityOptions: { label: string; value: StoryPriority }[] = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  private readonly assigneeOptions: Assignee[] = [
    { name: 'Kunal' },
    { name: 'Dipika' },
    { name: 'Umang' },
    { name: 'Utkarsh' },
    { name: 'Avnish' },
    { name: 'Kishlay' },
  ];

  protected readonly filteredAssignees = signal<Assignee[]>([]);
  protected readonly formSubmitted = signal(false);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    assignee: new FormControl<Assignee | string | null>(null, Validators.required),
    status: this.fb.control<StoryStatus>('backlog', Validators.required),
    priority: this.fb.control<StoryPriority>('medium', Validators.required),
    storyPoints: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    // Patch the form whenever a story is passed in for editing.
    effect(() => {
      const story = this.story();
      if (story) this.form.patchValue(story);
    });
  }

  protected close() {
    this.visible.set(false);
    this.form.reset();
    this.formSubmitted.set(false);
  }

  protected saveStory() {
    this.formSubmitted.set(true);
    if (this.form.invalid) return;

    const { assignee, ...value } = this.form.getRawValue();
    const current = this.story();

    this.save.emit({
      ...value,
      assignee: typeof assignee === 'string' ? { name: assignee } : assignee!,
      id: current?.id ?? Date.now(),
      createdAt: current?.createdAt ?? new Date(),
    });

    this.close();
  }

  protected searchAssignee(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredAssignees.set(
      this.assigneeOptions.filter((user) => user.name.toLowerCase().includes(query)),
    );
  }

  protected isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || this.formSubmitted());
  }
}
