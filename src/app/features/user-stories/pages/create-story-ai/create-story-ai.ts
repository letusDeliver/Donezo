import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  standalone: true,
  selector: 'app-create-story-ai',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './create-story-ai.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './create-story-ai.scss',
})
export class CreateStoryAi {}
