import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR_MENU } from '../../core/constants/sidebar-menu';
import { SidebarMenuItem } from '../../core/models/sidebar-menu.model';
import { RouteState } from '../../core/services/route-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly routeState = inject(RouteState);

  readonly collapsed = input(false);

  protected readonly menuItems: readonly SidebarMenuItem[] = SIDEBAR_MENU;

  /** Labels of expanded parent menus (only one at a time). */
  private readonly expanded = signal<string | null>(null);

  /** Parent whose child route matches the current URL. */
  private readonly activeParent = computed(
    () => this.menuItems.find((menu) => this.hasActiveChild(menu))?.label ?? null,
  );

  constructor() {
    // Auto-expand the active parent whenever the route changes.
    effect(() => this.expanded.set(this.activeParent()));
  }

  protected isExpanded(menu: SidebarMenuItem): boolean {
    return this.expanded() === menu.label;
  }

  protected isParentActive(menu: SidebarMenuItem): boolean {
    return this.activeParent() === menu.label;
  }

  protected toggleMenu(menu: SidebarMenuItem) {
    this.expanded.update((current) => (current === menu.label ? null : menu.label));
  }

  private hasActiveChild(menu: SidebarMenuItem): boolean {
    const url = this.routeState.url();
    return !!menu.children?.some((child) => url.startsWith(child.route || ''));
  }
}
