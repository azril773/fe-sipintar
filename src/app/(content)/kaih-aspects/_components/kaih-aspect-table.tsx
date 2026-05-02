"use client";

import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteAspect, searchAspects } from "@/src/app/_api/kaih_aspect";
import ConfirmAlertDialog from "@/src/components/global/alert";
import PaginationTable from "@/src/components/global/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { KaihAspect } from "@/src/types/kaih";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";

const PER_PAGE = 10;

export default function KaihAspectTable({
  search,
  currentPage,
  onPageChange,
  token,
}: {
  search: string;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  token: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<KaihAspect[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const loadData = useEffectEvent(async (page: number) => {
    const accessToken = cookies.get("access_token") || token;
    if (!accessToken) {
      return;
    }

    const { data, total, error } = await searchAspects({
      token: accessToken,
      page,
      perPage: PER_PAGE,
      search,
    });
    console.log(data)

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    const nextTotalPages = Math.max(1, Math.ceil(total / PER_PAGE));
    setData(data);
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

    const { error } = await deleteAspect({ token: accessToken, id: selectedId });
    if (error) {
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "Aspect berhasil dihapus.", "success");
    setIsDeleteOpen(false);
    loadData(currentPage);
  });

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, search]);

  return (
    <div className="space-y-3">
      <div className="table-shell">
        <Table className="[--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-10 table-head-typography">No</TableHead>
              <TableHead className="table-head-typography">Nama Aspect</TableHead>
              <TableHead className="table-head-typography">Deskripsi</TableHead>
              <TableHead className="table-head-typography">Sequence</TableHead>
              <TableHead className="table-head-typography">Dibuat Pada</TableHead>
              <TableHead className="table-head-typography">Diperbarui Pada</TableHead>
              <TableHead className="pr-10 text-center table-head-typography">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-10 table-cell-number">
                  {(currentPage - 1) * PER_PAGE + index + 1}
                </TableCell>
                <TableCell className="table-cell-primary">{item.name}</TableCell>
                <TableCell className="table-cell-muted">{item.description || "-"}</TableCell>
                <TableCell className="table-cell-muted">{item.sequence_no}</TableCell>
                <TableCell className="table-cell-muted">{new Date(item.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="table-cell-muted">{new Date(item.updated_at).toLocaleDateString()}</TableCell>
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
                        <DropdownMenuItem onClick={() => router.push(`/kaih-aspects/${item.id}/edit`)}>
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
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-slate-500">
                  Data aspect tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationTable currentPage={currentPage} setCurrentPage={onPageChange} totalPages={totalPages} />

      <ConfirmAlertDialog
        title="Konfirmasi Hapus Aspect"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        onClick={handleDelete}
      />
    </div>
  );
}
