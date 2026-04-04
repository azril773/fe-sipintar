import { Button } from "@/src/components/ui/button";

import UserTable from "./_components/users-table";

export default function UsersPage() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Data Users</h1>
                <Button  className="text-white hover:opacity-90 bg-[#059669]">
                    Create Users
                </Button>
            </div>

            <UserTable />

        </div>
    );
}