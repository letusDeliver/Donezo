import { Component } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {

}
