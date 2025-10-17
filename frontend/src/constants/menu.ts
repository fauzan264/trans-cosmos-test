// types/menu.ts
export interface MenuItem {
  label: string;
  href: string;
  roles: string[];
  icon?: React.ReactNode;
}

export const ADMIN_SIDEBAR_MENUS: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    roles: ["admin", "user"],
  },
  {
    label: "Tasks",
    href: "/admin/tasks",
    roles: ["admin", "user"],
  },
  {
    label: "Users",
    href: "/admin/users",
    roles: ["admin", "user"],
  },
];

export const AUTH_MENUS: MenuItem[] = [
  { label: "Register", href: "/register", roles: [] },
  { label: "Login", href: "/", roles: [] },
];

export const USER_DROPDOWN_MENUS = [
  {
    label: "Dashboard",
    href: "/admin",
    roles: ["admin", "user"],
  },
  {
    label: "Profile",
    href: "/admin/profile",
    roles: ["admin", "user"],
  },
];
