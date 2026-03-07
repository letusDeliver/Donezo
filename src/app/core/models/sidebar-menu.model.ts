export interface SidebarMenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarMenuItem[];
  expanded?: boolean;

  // for future role based access
  permission?: string;
}
