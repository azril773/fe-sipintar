"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { PaginationControls } from "@/components/ui/pagination-controls";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { activatePaud, searchPauds, suspendPaud } from "@/src/app/_api/paud";
import ConfirmAlertDialog from "@/src/components/global/alert";
import BadgeStatus from "@/src/components/global/badge-status";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ACTIVE, BASE_URL, DOMAIN, SUSPENDED } from "@/src/constants";
import { UUID } from "@/src/types/common";
import { Paud } from "@/src/types/paud";
import { cookies } from "@/src/utils";
import { notification } from "@/src/utils/toast";

const PER_PAGE = 10;

export default function PaudTable({
  search,
  currentPage,
  onPageChange,
}: {
  search: string;
  currentPage: number;
  onPageChange: Dispatch<SetStateAction<number>>;
}) {
  const [paudData, setPaudData] = useState<Paud[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [selectedId, setSelectedId] = useState<UUID | null>(null);
  const [statusChange, setStatusChange] = useState<"activate" | "suspend" | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const loadData = useEffectEvent(async (page: number) => {
    const token = cookies.get("access_token");
    if (!token) {
      return;
    }

    const { data, total, error } = await searchPauds({
      token,
      page,
      perPage: PER_PAGE,
      search,
    });

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    const nextTotalPages = Math.max(1, Math.ceil(total / PER_PAGE));

    setPaudData(data);
    setTotalPages(nextTotalPages);

    if (page > nextTotalPages) {
      onPageChange(nextTotalPages);
    }
  });

  const handleStatusChange = async (
    id: UUID | null,
    status: "activate" | "suspend" | null,
  ) => {
    const token = cookies.get("access_token");
    if (!token) {
      return;
    }

    if (!id || !status) {
      notification("Error!", "ID atau status tidak valid.", "error");
      return;
    }

    const { error } = await (status === "activate" ? activatePaud : suspendPaud)(id, token);
    if (error.length > 0) {
      notification("Error!", error, "error");
      return;
    }

    notification(
      "Sukses!",
      `PAUD berhasil ${status === "activate" ? "diaktifkan" : "disuspend"}.`,
      "success",
    );
    loadData(currentPage);
    setIsAlertOpen(false);
  };

  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedData = paudData;

  useEffect(() => {
    loadData(currentPage);
  }, [currentPage, search]);

  useEffect(() => {
    if (safeCurrentPage !== currentPage) {
      onPageChange(safeCurrentPage);
    }
  }, [currentPage, onPageChange, safeCurrentPage]);

  return (
    <div className="space-y-3">
      <div className="table-shell">
        <Table className="[--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-10 table-head-typography">No</TableHead>
              <TableHead className="table-head-typography">Logo</TableHead>
              <TableHead className="table-head-typography">Nama</TableHead>
              <TableHead className="table-head-typography">Subdomain</TableHead>
              <TableHead className="table-head-typography">Status</TableHead>
              <TableHead className="pr-10 text-center table-head-typography">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-10 table-cell-number">
                  {(safeCurrentPage - 1) * PER_PAGE + index + 1}
                </TableCell>
                <TableCell>
                  <Image
                    src={item.logo || `${BASE_URL}/public/images.png`}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-xl border border-slate-200 object-cover shadow-sm"
                  />
                </TableCell>
                <TableCell className="table-cell-primary">{item.name}</TableCell>
                <TableCell className="table-cell-muted">
                  <Link
                    className="text-blue-500 hover:text-blue-600"
                    href={`http://${item.subdomain}.${DOMAIN}`}
                    target="_blank"
                  >
                    {`${item.subdomain}.${DOMAIN}`}
                  </Link>
                </TableCell>
                <TableCell className="table-cell-muted">
                  <BadgeStatus status={item.status} />
                </TableCell>
                <TableCell className="pr-10">
                  <div className="flex items-center justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {item.status === ACTIVE && (
                          <DropdownMenuItem
                            onClick={() => {
                              setIsAlertOpen(true);
                              setSelectedId(item.id);
                              setStatusChange("suspend");
                            }}
                            className="focus:bg-accent focus:text-accent-foreground"
                          >
                            Suspend
                          </DropdownMenuItem>
                        )}
                        {item.status === SUSPENDED && (
                          <DropdownMenuItem
                            onClick={() => {
                              setIsAlertOpen(true);
                              setSelectedId(item.id);
                              setStatusChange("activate");
                            }}
                            className="focus:bg-accent focus:text-accent-foreground"
                          >
                            Activate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm text-slate-500">
                  Data PAUD tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <ConfirmAlertDialog
        title="Konfirmasi Perubahan Status"
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onClick={() => handleStatusChange(selectedId, statusChange)}
      />
    </div>
  );
}