"use client";

import { Layers3, ListChecks, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPageToolbar } from "@/components/ui/list-page-toolbar";
import { useAuth } from "@/hooks/use-auth";
import { searchAspects } from "@/src/app/_api/kaih_aspect";

import KaihAspectTable from "./_components/kaih-aspect-table";

type AspectStats = {
  totalAspects: number;
};

export default function KaihAspectsPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState<AspectStats>({ totalAspects: 0 });

  const loadStats = useEffectEvent(async () => {
    if (!token) {
      return;
    }

    const { total, error } = await searchAspects({ token, page: 1, perPage: 1 });
    if (error) {
      return;
    }

    setStats({ totalAspects: total });
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    loadStats();
  }, [token]);

  if (!token) {
    return (
      <div className="p-6">
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-600">Anda harus login terlebih dahulu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="group relative overflow-hidden border-slate-200/80 bg-linear-to-br from-white via-sky-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Aspect</CardTitle>
            <div className="rounded-lg bg-sky-100 p-2 text-sky-700 ring-1 ring-sky-200">
              <Layers3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-2xl font-bold tracking-tight text-slate-900">{stats.totalAspects}</p>
            <p className="mt-1 text-xs text-slate-500">Jumlah seluruh aspect KAIH</p>
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
            <p className="mt-1 text-xs text-slate-500">Filter nama atau deskripsi aspect</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-violet-200/70 bg-linear-to-br from-white via-violet-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Per Halaman</CardTitle>
            <div className="rounded-lg bg-violet-100 p-2 text-violet-700 ring-1 ring-violet-200">
              <ListChecks className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-2xl font-bold tracking-tight text-violet-700">10</p>
            <p className="mt-1 text-xs text-slate-500">Jumlah data aspect tiap halaman</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <ListPageToolbar
          title="Data Aspect KAIH"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          searchPlaceholder="Cari nama atau deskripsi aspect..."
          createLabel="Create Aspect"
          onCreateClick={() => router.push("/kaih-aspects/create")}
        />

        <KaihAspectTable
          search={debouncedSearch}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          token={token}
        />
      </div>
    </div>
  );
}
