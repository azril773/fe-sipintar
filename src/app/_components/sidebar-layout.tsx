"use client";

import { ArrowRightEndOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/constants/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import type { Route } from "@/types/common";

const getActiveStyles = (href: string, pathname: string) => {
  const isActive = pathname.includes(href);
  if (!isActive) return "hover:bg-gray-100 border-l-4 border-transparent";

  // Map hrefs to color schemes
  const colorSchemes: Record<string, { bg: string; text: string; border: string }> = {
    "/dashboard": { bg: "bg-blue-50", text: "text-blue-600", border: "border-l-blue-600" },
    "/siswa": { bg: "bg-purple-50", text: "text-purple-600", border: "border-l-purple-600" },
    "/guru": { bg: "bg-green-50", text: "text-green-600", border: "border-l-green-600" },
    "/kelas": { bg: "bg-orange-50", text: "text-orange-600", border: "border-l-orange-600" },
    "/kurikulum": { bg: "bg-rose-50", text: "text-rose-600", border: "border-l-rose-600" },
    "/nilai": { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-l-cyan-600" },
    "/pengumuman": { bg: "bg-amber-50", text: "text-amber-600", border: "border-l-amber-600" },
    "/acara": {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-l-indigo-600",
    },
    "/pengaturan": {
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-l-slate-600",
    },
  };

  const scheme = colorSchemes[href] || colorSchemes["/dashboard"];
  return `${scheme.bg} ${scheme.border} border-l-4 font-semibold ${scheme.text}`;
};

export default function SidebarLayout() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      {/* Header dengan Gradient */}
      <SidebarHeader className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-6 rounded-b-lg shadow-sm">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">PAUD</h1>
          <p className="text-xs text-white/80">Sistem Informasi Pendidikan</p>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-2 py-4">
        {/* Workspace Selector */}
        <SidebarGroup className="mb-4">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="bg-blue-50 hover:bg-blue-100 border border-blue-100 h-10 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-blue-500 to-purple-500"></div>
                  <span className="text-sm font-medium text-gray-700">
                    TK Ceria Bersama
                  </span>
                  <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" className="w-48">
                <DropdownMenuItem>
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>TK Ceria Bersama</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>PAUD Al-Hidayah</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <span>PAUD Bunga Taman</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarGroup>

        {/* Menu Items */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {routes.map((route: Route) => {
              const isActive = pathname.includes(route.href);

              return (
                <SidebarMenuItem key={route.href}>
                  <Link href={route.href}>
                    <SidebarMenuButton
                      className={`group relative h-10 px-3 rounded-lg transition-all duration-200 ${getActiveStyles(route.href, pathname)}`}
                      asChild
                    >
                      <button className="w-full justify-start">
                        <span
                          className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
                        >
                          {route.icon}
                        </span>
                        <span
                          className={`text-sm font-medium transition-colors duration-200 ${
                            isActive ? "font-semibold" : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {route.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-purple-500 animate-pulse"></div>
                        )}
                      </button>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-gray-100 py-4 px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-10 px-3 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                    OR
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-gray-900">
                      Orang Tua
                    </span>
                    <span className="text-xs text-gray-500">Akun Saya</span>
                  </div>
                  <ChevronDownIcon className="ml-auto h-4 w-4 text-gray-400" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuItem>
                  <span>Profil Saya</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Pengaturan Akun</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Bantuan</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">
                  <ArrowRightEndOnRectangleIcon className="h-4 w-4 mr-2" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
