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
import { searchUsers } from "@/src/app/_api/user";
import { User } from "@/src/types/users";
import { cookies } from "@/src/utils";

export default function UserTable() {
  const [userData, setUserData] = useState<User[]>([]);

  const loadData = useEffectEvent(async () => {
    const token = cookies.get("access_token");
    console.log(token);
    if (!token) return

    const { data, error } = await searchUsers({ token });
    if (error) {
      console.log(error);
      return;
    }
    setUserData(data);
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
            <TableHead>Nama Users</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>PAUD</TableHead>
            <TableHead>Dibuat Pada</TableHead>
            <TableHead>Diperbarui Pada</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.role_name}</TableCell>
              <TableCell>{item.paud_name ?? "Central"}</TableCell>
              <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(item.updated_at).toLocaleDateString()}</TableCell>
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
