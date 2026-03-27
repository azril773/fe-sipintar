import {
  AcademicCapIcon,
  BellIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  HomeIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/16/solid";

import { Route } from "@/types/common";

export const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

export const routes: Route[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    href: "/siswa",
    label: "Data Siswa",
    icon: <UserCircleIcon />,
  },
  {
    href: "/guru",
    label: "Manajemen Guru",
    icon: <AcademicCapIcon />,
  },
  {
    href: "/kelas",
    label: "Kelas & Kelompok",
    icon: <UserGroupIcon />,
  },
  {
    href: "/kurikulum",
    label: "Kurikulum",
    icon: <BookOpenIcon />,
  },
  {
    href: "/nilai",
    label: "Nilai & Rapor",
    icon: <DocumentChartBarIcon />,
  },
  {
    href: "/pengumuman",
    label: "Pengumuman",
    icon: <BellIcon />,
  },
  {
    href: "/acara",
    label: "Acara Sekolah",
    icon: <CalendarDaysIcon />,
  },
  {
    href: "/pengaturan",
    label: "Pengaturan",
    icon: <Cog6ToothIcon />,
  },
];
