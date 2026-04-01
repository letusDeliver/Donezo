import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { UserStory } from '../../models/user-story.model';

@Component({
  standalone: true,
  selector: 'app-add-story-modal',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './add-story-modal.html',
  styleUrl: './add-story-modal.scss',
})
export class AddStoryModal implements OnChanges {
  @Input() visible = false;
  @Input() story: UserStory | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<UserStory>();

  form!: FormGroup;
  formSubmitted = false;

  // Dropdown Options
  statusOptions = [
    { label: 'Backlog', value: 'backlog' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
    { label: 'To Do', value: 'to-do' },
    { label: 'Review', value: 'review' },
  ];

  priorityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
  ];

  assigneeOptions = [
    { name: 'Kunal' },
    { name: 'Dipika' },
    { name: 'Umang' },
    { name: 'Utkarsh' },
    { name: 'Avnish' },
    { name: 'Kishlay' },
  ];

  filteredAssignees: any[] = [];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  // Initialize Form
  initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      assignee: [null, Validators.required],
      status: ['backlog', Validators.required],
      priority: ['medium', Validators.required],
      storyPoints: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // Patch data when editing
  ngOnChanges(changes: SimpleChanges) {
    if (changes['story'] && this.story) {
      this.form.patchValue(this.story);
    }
  }

  // Close modal
  close() {
    this.visibleChange.emit(false);
    this.form.reset(); // optional reset
  }

  // Save
  saveStory() {
    this.formSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const finalStory: UserStory = {
      ...formValue,
      id: this.story?.id || Date.now(),
      createdAt: this.story?.createdAt || new Date(),
    };

    this.save.emit(finalStory);

    this.form.reset();
    this.formSubmitted = false;
    this.close();
  }

  // Autocomplete filter
  searchAssignee(event: any) {
    const query = event.query.toLowerCase();

    this.filteredAssignees = this.assigneeOptions.filter((user) =>
      user.name.toLowerCase().includes(query),
    );
  }

  // Easy access in template
  get f() {
    return this.form.controls;
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || this.formSubmitted));
  }
}
