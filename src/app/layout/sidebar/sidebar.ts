import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SIDEBAR_MENU } from '../../core/constants/sidebar-menu';
import { SidebarMenuItem } from '../../core/models/sidebar-menu.model';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menuItems: SidebarMenuItem[] = SIDEBAR_MENU;

  toggleMenu(menu: SidebarMenuItem) {
    menu.expanded = !menu.expanded;
  }
}
