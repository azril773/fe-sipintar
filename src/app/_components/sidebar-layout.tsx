"use client";

import {
  AcademicCapIcon,
  ArrowRightEndOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/16/solid";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/sidebar";
import { routes } from "@/constants/index";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";
import type { Route } from "@/types/common";

export default function SidebarLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/" });
    notification("Sukses!", "Anda berhasil logout.", "success");
    router.replace("/login");
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="px-4 py-6 rounded-b-lg shadow-sm">
        <div className="flex gap-2">
          <div className="bg-black rounded-md p-2 items-center flex">
            <AcademicCapIcon color="white" width={30} />
          </div>
          <div>
            <h1 className="text-2xl font-bold drop-shadow-lg">SiPintar</h1>
            <p className="text-sm text-emerald-600">
              Sistem Informasi Pendidikan
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 bg-linear-to-br  from-[#1e3a8a] to-[#059669] text-white!">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider mb-3 text-white">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {routes.map((route: Route) => {
              const isActive = pathname.includes(route.href);

              return (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton
                    onClick={() => handleClick(route.href)}
                    className={`cursor-pointer group relative h-10 px-3 rounded-lg transition-all duration-200 ${isActive ? "border-l-blue-600 border-l-4 font-semibold bg-white text-black" : ""}`}
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
                          isActive ? "font-semibold" : ""
                        }`}
                      >
                        {route.label}
                      </span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-black animate-pulse"></div>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

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
                    <span className="text-xs font-semibold ">Orang Tua</span>
                    <span className="text-xs">Akun Saya</span>
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
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  onClick={handleLogout}
                >
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
