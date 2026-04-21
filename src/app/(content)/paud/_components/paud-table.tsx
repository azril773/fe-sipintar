"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { activatePaud, searchPauds, suspendPaud } from "@/src/app/_api/paud";
import ConfirmAlertDialog from "@/src/components/global/alert";
import BadgeStatus from "@/src/components/global/badge-status";
import PaginationTable from "@/src/components/global/pagination";
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
  onPageChange: (page: number) => void;
}) {
  const { token } = useAuth();
  const [paudData, setPaudData] = useState<Paud[]>([]);

  const [selectedId, setSelectedId] = useState<UUID | null>(null);
  const [statusChange, setStatusChange] = useState<
    "activate" | "suspend" | null
  >(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const loadData = useEffectEvent(async () => {
    const token = cookies.get("access_token");
    if (!token) return;

    const { data, error } = await searchPauds({ token });
    if (error) {
      console.log(error);
      return;
    }
    setPaudData(data);
  });

  const handleStatusChange = async (
    id: UUID | null,
    status: "activate" | "suspend" | null,
  ) => {
    if (!token) return;
    if (!id || !status) {
      notification("Error!", "ID atau status tidak valid.", "error");
      return;
    }
    const { error } = await (
      status === "activate" ? activatePaud : suspendPaud
    )(id, token);
    if (error.length > 0) {
      notification("Error!", error, "error");
      return;
    }
    notification(
      "Sukses!",
      `PAUD berhasil ${status === "activate" ? "diaktifkan" : "disebutkan"}.`,
      "success",
    );
    loadData();
    setIsAlertOpen(false);
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredData = paudData.filter((item) => {
    if (!normalizedSearch) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.subdomain.toLowerCase().includes(normalizedSearch)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const handlePageChange: Dispatch<SetStateAction<number>> = (value) => {
    const nextPage = typeof value === "function" ? value(safeCurrentPage) : value;
    onPageChange(nextPage);
  };
  const paginatedData = filteredData.slice(
    (safeCurrentPage - 1) * PER_PAGE,
    safeCurrentPage * PER_PAGE,
  );

  useEffect(() => {
    loadData();
  }, []);

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
              <TableCell className="pl-10 table-cell-number">{(safeCurrentPage - 1) * PER_PAGE + index + 1}</TableCell>
              <TableCell>
                <Image
                  src={`${BASE_URL}/public/images.png`}
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
              <TableCell className="table-cell-muted"><BadgeStatus status={item.status} /></TableCell>
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
      <PaginationTable
        currentPage={safeCurrentPage}
        setCurrentPage={handlePageChange}
        totalPages={totalPages}
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
