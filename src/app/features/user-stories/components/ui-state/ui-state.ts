import { Component, Input } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';

@Component({
  standalone: true,
  selector: 'app-ui-state',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './ui-state.html',
  styleUrl: './ui-state.scss',
})
export class UiState {
  @Input() loading = false;
  @Input() message = 'No data';
}
