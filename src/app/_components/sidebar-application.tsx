"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";

import SidebarLayout from "./sidebar-layout";

export default function SidebarApplication({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SidebarLayout />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-4 shadow-sm">
          <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
          <div className="flex-1"></div>
        </header>
        <main className="flex-1 bg-linear-to-b from-gray-50 to-gray-100 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
