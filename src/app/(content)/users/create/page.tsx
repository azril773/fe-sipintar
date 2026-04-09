"use client";

import { useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { searchPauds } from "@/src/app/_api/paud";
import { Role, searchRoles } from "@/src/app/_api/role";
import { createUser } from "@/src/app/_api/user";
import BackButton from "@/src/components/global/back-button";
import HeaderList from "@/src/components/global/header-list";
import { SearchableSelect } from "@/src/components/global/searchable-select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { ErroField } from "@/src/types/common";
import { Paud } from "@/src/types/paud";
import { cookies } from "@/src/utils";
import { notification } from "@/utils/toast";


const ADMIN_DINAS_ROLE = "admin_dinas";

export default function CreateUserPage() {
    const router = useRouter();
    const { token } = useAuth();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [roleId, setRoleId] = useState<string>("");
    const [paudId, setPaudId] = useState<string>("");
    const [roles, setRoles] = useState<Role[]>([]);
    const [pauds, setPauds] = useState<Paud[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErroField>({});

    const selectedRole = useMemo(
        () => roles.find((role) => role.id === roleId),
        [roles, roleId],
    );

    const isAdminDinas = selectedRole?.name === ADMIN_DINAS_ROLE;

    const loadRoles = useEffectEvent(async () => {
        const token = cookies.get("access_token");
        if (!token) {
            return;
        }
        const { data, error } = await searchRoles({ token });
        if (error) {
            console.log(error);
            return
        }
        setRoles(data);

    });

    const loadPauds = useEffectEvent(async () => {
        const token = cookies.get("access_token");
        if (!token) {
            return;
        }
        const { data, error } = await searchPauds({ token });
        if (error) {
            console.log(error);
            return
        }
        setPauds(data);
    });
    useEffect(() => {
        loadRoles();
        loadPauds();
    }, [token]);

    if (!token) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p className="text-gray-600">Anda harus login terlebih dahulu</p>
                    </div>
                </div>
            </div>
        );
    }

    const handleCheckError = (field: string) => {
        if (error[field]) {
            setError((prev) => {
                delete prev[field];
                return { ...prev };
            });
        }
    };

    const handleCreate = async () => {
        if (!roleId) {
            notification("Error!", "Role belum tersedia.", "error");
            return;
        }

        if (!isAdminDinas && !paudId) {
            notification("Error!", "PAUD wajib dipilih untuk role ini.", "error");
            return;
        }

        setIsLoading(true);
        const { error } = await createUser({
            token,
            name,
            email,
            password,
            roleId,
            paudId: isAdminDinas ? null : paudId,
        });
        setIsLoading(false);

        if (error) {
            notification("Error!", error, "error");
            return;
        }

        notification("Sukses!", "User berhasil dibuat.", "success");
        router.push("/users");
    };

    return (
        <div className="p-6">
            <BackButton name="User" href="/users" />
            <HeaderList
                title="Buat User"
                description="Isi form berikut untuk membuat user baru."
            />
            <div className="max-w-full bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                handleCheckError("name");
                            }}
                            placeholder="Masukkan nama lengkap"
                            disabled={isLoading}
                            className="dark:bg-zinc-700 dark:border-zinc-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleCheckError("email");
                            }}
                            placeholder="Masukkan email"
                            disabled={isLoading}
                            className="dark:bg-zinc-700 dark:border-zinc-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                handleCheckError("password");
                            }}
                            placeholder="Masukkan password"
                            disabled={isLoading}
                            className="dark:bg-zinc-700 dark:border-zinc-600"
                        />
                    </div>
                    <SearchableSelect
                        label={`PAUD${isAdminDinas ? " (opsional untuk Admin Dinas)" : ""}`}
                        placeholder="Cari PAUD..."
                        items={pauds}
                        value={paudId}
                        onChange={(value) => {
                            setPaudId(value);
                            handleCheckError("paud");
                        }}
                        disabled={isLoading || isAdminDinas}
                        itemsPerPage={10}
                    />
                    <div className="space-y-2">
                        <SearchableSelect
                            label="Role"
                            placeholder="Cari role..."
                            items={roles}
                            value={roleId}
                            onChange={(value) => {
                                setRoleId(value);
                                const nextRole = roles.find((role) => role.id === value);
                                if (nextRole?.name === ADMIN_DINAS_ROLE) {
                                    setPaudId("");
                                }
                                handleCheckError("role");
                            }}
                            disabled={isLoading}
                            itemsPerPage={10}
                        />
                    </div>
                    <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-zinc-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/users")}
                            disabled={isLoading}
                            className="dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
                        >
                            Batal
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreate}
                            disabled={isLoading}
                            style={{ backgroundColor: "#059669" }}
                            className="text-white hover:opacity-90 cursor-pointer"
                        >
                            {isLoading ? "Membuat..." : "Buat User"}
                        </Button>
                    </div>
                </form>
                </div>
        </div>
    );
}