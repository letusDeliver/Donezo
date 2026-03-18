import { SidebarMenuItem } from '../models/sidebar-menu.model';

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
  },

  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    route: '/projects',
  },
  {
    label: 'User Stories',
    icon: 'pi pi-book',
    route: '/user-stories',
  },

  {
    label: 'Tickets',
    icon: 'pi pi-ticket',
    route: '/tickets',
  },

  {
    label: 'Tasks',
    icon: 'pi pi-list',
    route: '/tasks',
  },

  {
    label: 'Calendar',
    icon: 'pi pi-calendar',
    route: '/calendar',
  },

  {
    label: 'Analytics',
    icon: 'pi pi-chart-bar',
    route: '/analytics',
  },

  {
    label: 'Team',
    icon: 'pi pi-users',
    route: '/team',
  },
];
