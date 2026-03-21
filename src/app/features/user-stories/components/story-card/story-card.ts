import { Component, Input } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  standalone: true,
  selector: 'app-story-card',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './story-card.html',
  styleUrl: './story-card.scss',
})
export class StoryCard {
  @Input() story: any;

  getPriorityClass(priority: string) {
    return priority?.toLowerCase();
  }
}
