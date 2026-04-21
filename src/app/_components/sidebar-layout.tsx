"use client";

import {
  AcademicCapIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { routes, sidebarCollapsibleMenuSections } from "@/constants/index";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";

const MENU_BUTTON_CLASSNAME =
  "cursor-pointer font-light data-[active=true]:bg-sky-100 data-[active=true]:text-sky-600 hover:bg-blue-100 hover:text-blue-600";

const MENU_SUB_BUTTON_CLASSNAME =
  "cursor-pointer font-light data-[active=true]:bg-sky-100 data-[active=true]:text-sky-600 hover:bg-blue-100 hover:text-blue-600";

export default function SidebarLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);
  const dashboardRoute = routes.find((route) => route.href === "/dashboard");
  const settingRoute = routes.find((route) => route.href === "/setting");

  const menuSections = sidebarCollapsibleMenuSections.map((section) => {
    const sectionRoutes = routes.filter((route) => section.hrefs.includes(route.href));
    return {
      ...section,
      routes: sectionRoutes,
      isActive: sectionRoutes.some((route) => isActive(route.href)),
    };
  });

  const handleLogout = () => {
    cookies.remove("access_token", { path: "/" });
    notification("Sukses!", "Anda berhasil logout.", "success");
    router.replace("/login");
  };

  return (
    <Sidebar variant="inset" className="border-none">
      <SidebarHeader className="pt-5">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-black">
            <AcademicCapIcon color="white" width={30} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">SiPintar</h1>
            <p className="text-xs text-slate-500">Sistem Informasi Pendidikan</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="my-3" />

      <SidebarContent className="px-0 py-1">
        {dashboardRoute && (
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem key={dashboardRoute.href}>
                  <SidebarMenuButton
                    isActive={isActive(dashboardRoute.href)}
                    onClick={() => router.push(dashboardRoute.href)}
                    className={MENU_BUTTON_CLASSNAME}
                  >
                    {dashboardRoute.icon}
                    <span>{dashboardRoute.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="p-0 pt-1">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuSections.map((section) => {
                const SectionIcon = section.icon;

                return (
                  <SidebarMenuItem key={section.key}>
                    <Collapsible
                      defaultOpen={section.isActive}
                      className="group/collapsible"
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={section.isActive}
                          className={MENU_BUTTON_CLASSNAME}
                        >
                          <SectionIcon className={section.iconClassName} />
                          <span>{section.label}</span>
                          <ChevronDownIcon
                            className={`ml-auto ${section.chevronClassName} transition-transform group-data-[state=open]/collapsible:rotate-180`}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub className="gap-1">
                          {section.routes.map((route) => (
                            <SidebarMenuSubItem key={route.href}>
                              <SidebarMenuSubButton
                                isActive={isActive(route.href)}
                                onClick={() => router.push(route.href)}
                                className={MENU_SUB_BUTTON_CLASSNAME}
                              >
                                <span>{route.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {settingRoute && (
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem key={settingRoute.href}>
                  <SidebarMenuButton
                    isActive={isActive(settingRoute.href)}
                    onClick={() => router.push(settingRoute.href)}
                    className={MENU_BUTTON_CLASSNAME}
                  >
                    {settingRoute.icon}
                    <span>{settingRoute.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t px-2 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-10 rounded-sm px-3 hover:bg-gray-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-linear-to-br from-blue-400 to-purple-400 text-xs font-bold text-white">
                    OR
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold">Orang Tua</span>
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
                  className="text-red-600 focus:bg-red-50 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <ArrowRightEndOnRectangleIcon className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
