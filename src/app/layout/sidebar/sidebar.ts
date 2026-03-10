import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR_MENU } from '../../core/constants/sidebar-menu';
import { SidebarMenuItem } from '../../core/models/sidebar-menu.model';
import { filter } from 'rxjs/operators';
import { ANGULAR_IMPORTS } from '../../shared/ui/angular-imports';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [...ANGULAR_IMPORTS, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems: SidebarMenuItem[] = SIDEBAR_MENU;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.expandActiveParent();

    // Listen to route change
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.expandActiveParent();
    });
  }

  toggleMenu(menu: SidebarMenuItem) {
    // Collapse other menus (professional UX)
    this.menuItems.forEach((item) => {
      if (item !== menu) {
        item.expanded = false;
      }
    });

    menu.expanded = !menu.expanded;
  }

  isParentActive(menu: SidebarMenuItem): boolean {
    if (!menu.children) return false;

    const currentUrl = this.router.url;

    return menu.children.some((child) => currentUrl.startsWith(child.route || ''));
  }

  private expandActiveParent() {
    const currentUrl = this.router.url;

    this.menuItems.forEach((menu) => {
      if (menu.children) {
        const match = menu.children.some((child) => currentUrl.startsWith(child.route || ''));

        menu.expanded = match;
      }
    });
  }
}
