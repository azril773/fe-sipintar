"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

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

export default function PaudTable() {
  const { token } = useAuth();
  const [paudData, setPaudData] = useState<Paud[]>([]);

  const [selectedId, setSelectedId] = useState<UUID | null>(null);
  const [statusChange, setStatusChange] = useState<
    "activate" | "suspend" | null
  >(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, _setTotalPages] = useState<number>(1);

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
    setIsAlertOpen(false)
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="border rounded-lg bg-white shadow">
      <Table className=" [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Subdomain</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paudData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Image
                  src={`${BASE_URL}/public/image/logo/c.jpg`}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Link
                  className="text-blue-500"
                  href={`http://${item.subdomain}.${DOMAIN}`}
                  target="_blank"
                >
                  {`${item.subdomain}.${DOMAIN}`}
                </Link>
              </TableCell>
              <TableCell>{<BadgeStatus status={item.status} />}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
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
                    {/* <DropdownMenuItem></DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
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
