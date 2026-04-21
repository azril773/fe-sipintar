"use client";

import { Building2, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPageToolbar } from "@/components/ui/list-page-toolbar";
import { useAuth } from "@/hooks/use-auth";
import { searchPauds } from "@/src/app/_api/paud";

import PaudTable from "./_components/paud-table";

type PaudStats = {
  totalPaud: number;
};

export default function PaudPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stats, setStats] = useState<PaudStats>({
    totalPaud: 0,
  });

  const loadStats = useEffectEvent(async () => {
    if (!token) {
      return;
    }

    const { data, error } = await searchPauds({ token });

    if (error) {
      return;
    }

    setStats({
      totalPaud: data.length,
    });
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    loadStats();
  }, [token]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="group relative overflow-hidden border-slate-200/80 bg-linear-to-br from-white via-sky-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total PAUD</CardTitle>
            <div className="rounded-lg bg-sky-100 p-2 text-sky-700 ring-1 ring-sky-200">
              <Building2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-2xl font-bold tracking-tight text-slate-900">{stats.totalPaud}</p>
            <p className="mt-1 text-xs text-slate-500">Jumlah seluruh data PAUD</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-emerald-200/70 bg-linear-to-br from-white via-emerald-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Pencarian</CardTitle>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700 ring-1 ring-emerald-200">
              <Search className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="truncate text-xl font-bold tracking-tight text-emerald-700">
              {debouncedSearch || "Semua data"}
            </p>
            <p className="mt-1 text-xs text-slate-500">Filter nama atau subdomain PAUD</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-amber-200/70 bg-linear-to-br from-white via-amber-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Per Halaman</CardTitle>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-700 ring-1 ring-amber-200">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-2xl font-bold tracking-tight text-amber-700">10</p>
            <p className="mt-1 text-xs text-slate-500">Jumlah data PAUD tiap halaman</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <ListPageToolbar
          title="Data PAUD"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          searchPlaceholder="Cari nama atau subdomain PAUD..."
          createLabel="Create PAUD"
          onCreateClick={() => router.push("/paud/create")}
        />

        <PaudTable
          search={debouncedSearch}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
