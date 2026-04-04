"use client";

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
import { searchPauds } from "@/src/app/_api/paud";
import { Paud } from "@/src/types/paud";
import { cookies } from "@/src/utils";

export default function PaudTable() {
  const [paudData, setPaudData] = useState<Paud[]>([]);

  const loadData = useEffectEvent(async () => {
    const token = cookies.get("access_token");
    if (!token) return

    const { data, error } = await searchPauds({ token });
    if (error) {
      console.log(error);
      return;
    }
    setPaudData(data);
  })

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="border rounded-lg">
      <Table className=" [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama PAUD</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paudData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
