"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { getAspectById, updateAspect } from "@/src/app/_api/kaih_aspect";
import BackButton from "@/src/components/global/back-button";
import HeaderList from "@/src/components/global/header-list";
import { notification } from "@/src/utils/toast";

export default function EditKaihAspectPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sequenceNo, setSequenceNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);

  const loadAspect = useEffectEvent(async () => {
    if (!token || !params.id) {
      return;
    }

    setIsLoadingInitial(true);
    const { data, error } = await getAspectById({ token, id: params.id });
    setIsLoadingInitial(false);

    if (error || !data) {
      notification("Error!", error || "Aspect tidak ditemukan.", "error");
      router.push("/kaih-aspects");
      return;
    }

    setName(data.name || "");
    setDescription(data.description || "");
    setSequenceNo(data.sequence_no || 0);
  });

  useEffect(() => {
    loadAspect();
  }, [token, params.id]);

  if (!token) {
    return (
      <div className="p-6">
        <div className="flex h-screen items-center justify-center">
          <p className="text-gray-600">Anda harus login terlebih dahulu</p>
        </div>
      </div>
    );
  }

  const handleUpdate = async () => {
    if (!params.id) {
      notification("Error!", "ID aspect tidak valid.", "error");
      return;
    }

    setIsLoading(true);
    const { error } = await updateAspect({
      token,
      id: params.id,
      name,
      description: description || null,
      sequenceNo,
    });
    setIsLoading(false);

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "Aspect berhasil diperbarui.", "success");
    router.push("/kaih-aspects");
  };

  return (
    <div className="space-y-4">
      <BackButton name="KAIH Aspect" href="/kaih-aspects" />
      <HeaderList title="Edit Aspect" description="Ubah data aspect melalui form berikut." />

      <div className="max-w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Aspect</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading || isLoadingInitial} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading || isLoadingInitial} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sequence_no">Sequence No</Label>
            <Input id="sequence_no" type="number" value={sequenceNo} onChange={(e) => setSequenceNo(Number(e.target.value))} disabled={isLoading || isLoadingInitial} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.push("/kaih-aspects")} disabled={isLoading || isLoadingInitial}>
              Batal
            </Button>
            <Button type="button" onClick={handleUpdate} disabled={isLoading || isLoadingInitial} className="bg-sky-500 text-white hover:bg-sky-600">
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
