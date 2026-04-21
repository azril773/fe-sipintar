import {
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/16/solid";
import { FolderOpen, Users } from "lucide-react";

import { Route } from "@/types/common";


export const DOMAIN = process.env.DOMAIN || "sipintar.com:3001";
export const BASE_URL = process.env.BASE_URL || "http://sipintar.com:8080";
export const ACTIVE = "active"
export const SUSPENDED = "suspended"
export const PENDING = "pending"
export const CANCELLED = "cancelled"

export const ADMIN_DINAS = "admin_dinas"
export const ADMIN_PAUD = "admin_paud"
export const KEPALA_PAUD = "kepala_paud"
export const GURU = "guru"
export const ORANG_TUA = "orang_tua"

export const UNAUTHORIZED_CODE = 401

export const USER_MANAGEMENT_HREFS = ["/users"]
export const MASTER_DATA_HREFS = ["/paud"]

export const sidebarCollapsibleMenuSections = [
  {
    key: "user-management",
    label: "Manajemen Pengguna",
    icon: Users,
    iconClassName: "h-4 w-4",
    chevronClassName: "h-4 w-4",
    hrefs: USER_MANAGEMENT_HREFS,
  },
  {
    key: "master-data",
    label: "Master Data",
    icon: FolderOpen,
    iconClassName: "h-4 w-4",
    chevronClassName: "h-4 w-4",
    hrefs: MASTER_DATA_HREFS,
  },
]

export const routes: Route[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    href: "/setting",
    label: "Setting",
    icon: <Cog6ToothIcon />,
  },
  {
    href: "/paud",
    label: "Paud",
    icon: <HomeIcon />,
  },
  {
    href: "/users",
    label: "Users",
    icon: <HomeIcon />,
  }
];
