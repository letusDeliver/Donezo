import { Component, EventEmitter, Output } from '@angular/core';
import { PRIMENG_IMPORTS } from '../../shared/ui/primeng-imports';

@Component({
  selector: 'app-header',
  imports: [...PRIMENG_IMPORTS],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output()
  toggleSidebar = new EventEmitter<void>();
}
