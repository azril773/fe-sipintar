"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useEffectEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteIndicator, searchIndicators } from "@/src/app/_api/kaih_indicator";
import ConfirmAlertDialog from "@/src/components/global/alert";
import PaginationTable from "@/src/components/global/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { KaihAspect, KaihIndicator } from "@/src/types/kaih";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";

const PER_PAGE = 10;

export default function KaihIndicatorTable({
  search,
  currentPage,
  onPageChange,
  token,
  aspectId,
  aspects,
}: {
  search: string;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  token: string;
  aspectId: string;
  aspects: KaihAspect[];
}) {
  const router = useRouter();
  const [data, setData] = useState<KaihIndicator[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const loadData = useEffectEvent(async (page: number) => {
    const accessToken = cookies.get("access_token") || token;
    if (!accessToken) {
      return;
    }

    const { data: items, total, error } = await searchIndicators({
      token: accessToken,
      page,
      perPage: PER_PAGE,
      search,
      aspectId: aspectId || undefined,
    });

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    const nextTotalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    setData(items);
    setTotalPages(nextTotalPages);

    if (page > nextTotalPages) {
      onPageChange(nextTotalPages);
    }
  });

  const handleDelete = useEffectEvent(async () => {
    const accessToken = cookies.get("access_token") || token;
    if (!accessToken || !selectedId) {
      return;
    }

    const { error } = await deleteIndicator({ token: accessToken, id: selectedId });
    if (error) {
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "Indicator berhasil dihapus.", "success");
    setIsDeleteOpen(false);
    loadData(currentPage);
  });

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, search, aspectId]);

  return (
    <div className="space-y-3">
      <div className="table-shell">
        <Table className="[--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-10 table-head-typography">No</TableHead>
              <TableHead className="table-head-typography">Aspect</TableHead>
              <TableHead className="table-head-typography">Deskripsi</TableHead>
              <TableHead className="table-head-typography">Rubric</TableHead>
              <TableHead className="table-head-typography">Status</TableHead>
              <TableHead className="pr-10 text-center table-head-typography">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              const aspect = aspects.find((entry) => entry.id === item.aspect_id);
              return (
                <TableRow key={item.id}>
                  <TableCell className="pl-10 table-cell-number">
                    {(currentPage - 1) * PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell className="table-cell-muted">{aspect?.name || "-"}</TableCell>
                  <TableCell className="table-cell-primary">{item.description}</TableCell>
                  <TableCell className="table-cell-muted">{item.rubric || "-"}</TableCell>
                  <TableCell className="table-cell-muted">
                    <Badge className={item.active_flag ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-slate-100 text-slate-700"}>
                      {item.active_flag ? "ACTIVE" : "INACTIVE"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-10">
                    <div className="flex items-center justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/kaih-indicators/${item.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedId(item.id);
                              setIsDeleteOpen(true);
                            }}
                            className="text-red-600 focus:bg-red-50 focus:text-red-600"
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                  Data indicator tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationTable currentPage={currentPage} setCurrentPage={onPageChange} totalPages={totalPages} />

      <ConfirmAlertDialog
        title="Konfirmasi Hapus Indicator"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onClick={handleDelete}
      />
    </div>
  );
}
