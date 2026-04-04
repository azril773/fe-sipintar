"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { createPaud } from "@/app/_api/paud";
// import { useAuth } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";
import { createPaud } from "@/src/app/_api/paud";
import BackButton from "@/src/components/global/back-button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/src/components/ui/input-group";
import { ErroField } from "@/src/types/common";
import { notification } from "@/utils/toast";

export default function CreatePaudPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [subdomain, setSubdomain] = useState<string>("");
  const [fileReader, setFileReader] = useState<string>("");
  const [isLoading, _setIsLoading] = useState(false);
  const [error, setError] = useState<ErroField>({});

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
    const { data: _, error } = await createPaud(name, subdomain, logo, token);
    if (error) {
      notification("Error!", error, "error");
      return;
    }
    notification("Sukses!", "PAUD berhasil dibuat.", "success");
    router.push("/paud");
  };

  return (
    <div className="p-6">
      <BackButton name="Paud" href="/paud" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Buat PAUD Baru</h1>
        <p className="text-gray-600">Tambahkan data PAUD baru ke sistem</p>
      </div>

      <div className="max-w-full bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
        <form className="space-y-6">
          {/* Nama PAUD */}
          <div className="space-y-2">
            <Label htmlFor="name">Nama PAUD</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Masukkan nama PAUD"
              value={name}
              onChange={(e) => {
                handleCheckError("name");
                setName(e.target.value);
              }}
              disabled={isLoading}
              required
              className="dark:bg-zinc-700 dark:border-zinc-600"
            />
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              type="file"
              placeholder="Pilih file"
              onChange={(e) => {
                handleCheckError("logo");
                const file = e.target.files?.[0];
                if (file) setLogo(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setFileReader(reader.result as string);
                };
                reader.readAsDataURL(file!);
              }}
              disabled={isLoading}
              required
              className="dark:bg-zinc-700 dark:border-zinc-600"
            />
            {fileReader && (
                <img src={fileReader} alt="Preview Logo" className="mt-2 h-20 object-contain" />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subdomain">Subdomain</Label>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => {
                  handleCheckError("subdomain");
                  setSubdomain(e.target.value);
                }}
                placeholder="alazhar"
                className="pl-0.5!"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.sipintar.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-zinc-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/paud")}
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
              className="text-white hover:opacity-90"
            >
              {isLoading ? "Menyimpan..." : "Simpan PAUD"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
