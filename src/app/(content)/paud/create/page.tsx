"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { createPaud } from "@/src/app/_api/paud";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/src/components/ui/input-group";
import { ErroField } from "@/src/types/common";
import { notification } from "@/src/utils/toast";

export default function CreatePaudPage() {
  const router = useRouter();
  const { token } = useAuth();

  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [subdomain, setSubdomain] = useState<string>("");
  const [previewLogo, setPreviewLogo] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageError, setPageError] = useState<string>("");
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
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCreate = async () => {
    setIsLoading(true);
    setPageError("");

    const { data: _, error } = await createPaud(name, subdomain, logo, token);

    setIsLoading(false);

    if (error) {
      setPageError(error);
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "PAUD berhasil dibuat.", "success");
    router.push("/paud");
  };

  return (
    <div className="space-y-4">
      <div className="max-w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <div className="border-b border-slate-200/70 p-5 dark:border-slate-800/70">
          <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            Buat PAUD Baru
          </h1>
        </div>

        <div className="p-6">
          {pageError ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {pageError}
            </div>
          ) : null}

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-600 dark:text-slate-300">
                Nama PAUD
              </Label>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo" className="text-gray-600 dark:text-slate-300">
                Logo
              </Label>
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleCheckError("logo");
                  const file = e.target.files?.[0] || null;
                  setLogo(file);

                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreviewLogo(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setPreviewLogo("");
                  }
                }}
                disabled={isLoading}
              />
              {previewLogo ? (
                <img
                  src={previewLogo}
                  alt="Preview Logo"
                  className="h-20 w-20 rounded object-cover"
                />
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain" className="text-gray-600 dark:text-slate-300">
                Subdomain
              </Label>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="subdomain"
                  value={subdomain}
                  onChange={(e) => {
                    handleCheckError("subdomain");
                    setSubdomain(e.target.value);
                  }}
                  placeholder="alazhar"
                  className="pl-0.5!"
                  disabled={isLoading}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>.sipintar.com</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/paud")}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button
                type="button"
                onClick={handleCreate}
                disabled={isLoading}
                className="bg-sky-500 text-white hover:bg-sky-600"
              >
                {isLoading ? "Menyimpan..." : "Buat PAUD"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
