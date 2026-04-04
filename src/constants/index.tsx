import {
  HomeIcon,
} from "@heroicons/react/16/solid";

import { Route } from "@/types/common";

export const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

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
];
