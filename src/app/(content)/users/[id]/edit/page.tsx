"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { searchPauds } from "@/src/app/_api/paud";
import { Role, searchRoles } from "@/src/app/_api/role";
import { getUserById, updateUser } from "@/src/app/_api/user";
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

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [paudId, setPaudId] = useState<string>("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [pauds, setPauds] = useState<Paud[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [error, setError] = useState<ErroField>({});

  const selectedRole = useMemo(
    () => roles.find((role) => role.id === roleId),
    [roles, roleId],
  );

  const isAdminDinas = selectedRole?.name === ADMIN_DINAS_ROLE;

  const loadRoles = useEffectEvent(async () => {
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
      return;
    }

    const { data, error } = await searchRoles({ token: accessToken });
    if (error) {
      console.log(error);
      return;
    }

    setRoles(data);
  });

  const loadPauds = useEffectEvent(async () => {
    const accessToken = cookies.get("access_token");
    if (!accessToken) {
      return;
    }

    const { data, error } = await searchPauds({ token: accessToken });
    if (error) {
      console.log(error);
      return;
    }

    setPauds(data);
  });

  const loadUser = useEffectEvent(async () => {
    const accessToken = cookies.get("access_token");
    if (!accessToken || !params.id) {
      return;
    }

    setIsLoadingInitial(true);
    const { data, error } = await getUserById({
      token: accessToken,
      userId: params.id,
    });
    setIsLoadingInitial(false);

    if (error || !data) {
      notification("Error!", error || "User tidak ditemukan.", "error");
      router.push("/users");
      return;
    }

    setName(data.name || "");
    setEmail(data.email || "");
    setRoleId(data.role_id || "");
    setPaudId(data.paud_id || "");
  });

  useEffect(() => {
    loadRoles();
    loadPauds();
    loadUser();
  }, [token, params.id]);

  useEffect(() => {
    if (isAdminDinas) {
      setPaudId("");
    }
  }, [isAdminDinas]);

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

  const handleUpdate = async () => {
    if (!roleId) {
      notification("Error!", "Role wajib dipilih.", "error");
      return;
    }

    if (!isAdminDinas && !paudId) {
      notification("Error!", "PAUD wajib dipilih untuk role ini.", "error");
      return;
    }

    if (!params.id) {
      notification("Error!", "ID user tidak valid.", "error");
      return;
    }

    setIsLoading(true);
    const { error } = await updateUser({
      token,
      userId: params.id,
      name,
      email,
      roleId,
      paudId: isAdminDinas ? null : paudId,
    });
    setIsLoading(false);

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "User berhasil diupdate.", "success");
    router.push("/users");
  };

  return (
    <div className="p-6">
      <BackButton name="User" href="/users" />
      <HeaderList
        title="Edit User"
        description="Ubah data user melalui form berikut."
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
              disabled={isLoading || isLoadingInitial}
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
              disabled={isLoading || isLoadingInitial}
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
            disabled={isLoading || isLoadingInitial || isAdminDinas}
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
                handleCheckError("role");
              }}
              disabled={isLoading || isLoadingInitial}
              itemsPerPage={10}
            />
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-zinc-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/users")}
              disabled={isLoading || isLoadingInitial}
              className="dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={isLoading || isLoadingInitial}
              style={{ backgroundColor: "#059669" }}
              className="text-white hover:opacity-90 cursor-pointer"
            >
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
