"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useEffectEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchUsers } from "@/src/app/_api/user";
import PaginationTable from "@/src/components/global/pagination";
import { User } from "@/src/types/users";
import { cookies } from "@/src/utils";

const PER_PAGE = 10;

export default function UserTable({
  search,
  currentPage,
  onPageChange,
}: {
  search: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const router = useRouter();
  const [userData, setUserData] = useState<User[]>([]);

  const loadData = useEffectEvent(async () => {
    const token = cookies.get("access_token");
    if (!token) return;

    const { data, error } = await searchUsers({ token });
    if (error) {
      console.log(error);
      return;
    }
    setUserData(data);
  });

  const normalizedSearch = search.trim().toLowerCase();
  const filteredData = userData.filter((item) => {
    if (!normalizedSearch) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.email.toLowerCase().includes(normalizedSearch)
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
              <TableHead className="table-head-typography">Nama Users</TableHead>
              <TableHead className="table-head-typography">Email</TableHead>
              <TableHead className="table-head-typography">Role</TableHead>
              <TableHead className="table-head-typography">PAUD</TableHead>
              <TableHead className="table-head-typography">Dibuat Pada</TableHead>
              <TableHead className="table-head-typography">Diperbarui Pada</TableHead>
              <TableHead className="pr-10 text-center table-head-typography">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-10 table-cell-number">
                  {(safeCurrentPage - 1) * PER_PAGE + index + 1}
                </TableCell>
                <TableCell className="table-cell-primary">{item.name}</TableCell>
                <TableCell className="table-cell-muted">{item.email}</TableCell>
                <TableCell className="table-cell-muted">
                  <Badge className="border-indigo-100 bg-indigo-50 text-indigo-700">
                    {item.role_name}
                  </Badge>
                </TableCell>
                <TableCell className="table-cell-muted">{item.paud_name ?? "Central"}</TableCell>
                <TableCell className="table-cell-muted">
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="table-cell-muted">
                  {new Date(item.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="pr-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => router.push(`/users/${item.id}/edit`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-slate-500">
                  Data users tidak ditemukan.
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
    </div>
  );
}
