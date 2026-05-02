"use client";

import { Layers3, ListChecks, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListPageToolbar } from "@/components/ui/list-page-toolbar";
import { useAuth } from "@/hooks/use-auth";
import { searchAspects } from "@/src/app/_api/kaih_aspect";
import { searchIndicators } from "@/src/app/_api/kaih_indicator";
import { SearchableSelect } from "@/src/components/global/searchable-select";
import { KaihAspect } from "@/src/types/kaih";

import KaihIndicatorTable from "./_components/kaih-indicator-table";

type IndicatorStats = {
  totalIndicators: number;
};

export default function KaihIndicatorsPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [aspectId, setAspectId] = useState("");
  const [aspects, setAspects] = useState<KaihAspect[]>([]);
  const [stats, setStats] = useState<IndicatorStats>({ totalIndicators: 0 });

  const loadAspects = useEffectEvent(async () => {
    if (!token) {
      return;
    }

    const { data, error } = await searchAspects({ token, page: 1, perPage: 1000 });
    if (error) {
      return;
    }

    setAspects(data);
  });

  const loadStats = useEffectEvent(async () => {
    if (!token) {
      return;
    }

    const { total, error } = await searchIndicators({
      token,
      page: 1,
      perPage: 1,
      aspectId: aspectId || undefined,
    });

    if (error) {
      return;
    }

    setStats({ totalIndicators: total });
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchInput), 400);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, aspectId]);

  useEffect(() => {
    loadAspects();
  }, [token]);

  useEffect(() => {
    loadStats();
  }, [token, aspectId]);

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
            <CardTitle className="text-sm font-medium text-slate-600">Total Indicator</CardTitle>
            <div className="rounded-lg bg-sky-100 p-2 text-sky-700 ring-1 ring-sky-200">
              <Layers3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-2xl font-bold tracking-tight text-slate-900">{stats.totalIndicators}</p>
            <p className="mt-1 text-xs text-slate-500">Jumlah seluruh indicator KAIH</p>
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
            <p className="mt-1 text-xs text-slate-500">Filter deskripsi indicator</p>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden border-violet-200/70 bg-linear-to-br from-white via-violet-50/40 to-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200/40 blur-2xl" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Filter Aspect</CardTitle>
            <div className="rounded-lg bg-violet-100 p-2 text-violet-700 ring-1 ring-violet-200">
              <ListChecks className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <p className="truncate text-xl font-bold tracking-tight text-violet-700">
              {aspects.find((item) => item.id === aspectId)?.name || "Semua aspect"}
            </p>
            <p className="mt-1 text-xs text-slate-500">Filter berdasarkan aspect KAIH</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <ListPageToolbar
          title="Data Indicator KAIH"
          searchValue={searchInput}
          onSearchChange={setSearchInput}
          searchPlaceholder="Cari deskripsi indicator..."
          createLabel="Create Indicator"
          onCreateClick={() => router.push("/kaih-indicators/create")}
          extraFilters={
            <div className="min-w-56">
              <SearchableSelect
                label="Aspect"
                placeholder="Semua aspect"
                items={aspects}
                value={aspectId}
                onChange={setAspectId}
                itemsPerPage={8}
              />
            </div>
          }
        />

        <KaihIndicatorTable
          search={debouncedSearch}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          token={token}
          aspectId={aspectId}
          aspects={aspects}
        />
      </div>
    </div>
  );
}
