import { Component, EventEmitter, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  imports: [AvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output()
  toggleSidebar = new EventEmitter<void>();
}
