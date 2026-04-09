'use client'
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";

import UserTable from "./_components/users-table";

export default function UsersPage() {
    const router = useRouter();
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Data Users</h1>
                <Button  className="text-white hover:opacity-90 bg-[#059669]" onClick={() => router.push("/users/create")}>
                    Create Users
                </Button>
            </div>

            <UserTable />

        </div>
    );
}