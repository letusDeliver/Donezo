export interface SidebarMenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarMenuItem[];

  // for future role based access
  permission?: string;
}
