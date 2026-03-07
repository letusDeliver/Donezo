import { SidebarMenuItem } from "../models/sidebar-menu.model";

export const SIDEBAR_MENU: SidebarMenuItem[] = [

  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard'
  },

  {
    label: 'Projects',
    icon: 'pi pi-briefcase',
    expanded: false,
    children: [
      {
        label: 'All Projects',
        route: '/projects'
      },
      {
        label: 'Add Project',
        route: '/projects/add'
      }
    ]
  },

  {
    label: 'Tickets',
    icon: 'pi pi-ticket',
    expanded: false,
    children: [
      {
        label: 'All Tickets',
        route: '/tickets'
      },
      {
        label: 'Create Ticket',
        route: '/tickets/add'
      }
    ]
  },

  {
    label: 'Tasks',
    icon: 'pi pi-list',
    expanded: false,
    children: [
      {
        label: 'All Tasks',
        route: '/tasks'
      },
      {
        label: 'Create Task',
        route: '/tasks/add'
      }
    ]
  },

  {
    label: 'Calendar',
    icon: 'pi pi-calendar',
    route: '/calendar'
  },

  {
    label: 'Analytics',
    icon: 'pi pi-chart-bar',
    route: '/analytics'
  },

  {
    label: 'Team',
    icon: 'pi pi-users',
    route: '/team'
  }

];