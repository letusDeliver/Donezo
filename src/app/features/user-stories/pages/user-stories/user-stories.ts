import { Component } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
})
export class UserStories {

}
