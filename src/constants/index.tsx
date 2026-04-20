import {
  HomeIcon,
} from "@heroicons/react/16/solid";

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

export const routes: Route[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
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
