import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Viewport } from '../../core/services/viewport.service';
import { NgClass } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BreadCrumb } from '../../shared/components/bread-crumb/bread-crumb';

@Component({
  selector: 'app-header',
  imports: [NgClass, AvatarModule, BreadCrumb],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly collapsed = input(false);

  readonly toggleSidebar = output<void>();
  readonly toggleCollapse = output<void>();

  protected readonly isMobile = inject(Viewport).isMobile;

  protected readonly menuLabel = computed(() =>
    this.isMobile() ? 'Open menu' : this.collapsed() ? 'Expand sidebar' : 'Collapse sidebar',
  );

  protected onMenuClick() {
    if (this.isMobile()) {
      this.toggleSidebar.emit();
    } else {
      this.toggleCollapse.emit();
    }
  }
}
