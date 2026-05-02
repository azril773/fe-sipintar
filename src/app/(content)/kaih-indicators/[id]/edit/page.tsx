"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { searchAspects } from "@/src/app/_api/kaih_aspect";
import { getIndicatorById, updateIndicator } from "@/src/app/_api/kaih_indicator";
import BackButton from "@/src/components/global/back-button";
import HeaderList from "@/src/components/global/header-list";
import { SearchableSelect } from "@/src/components/global/searchable-select";
import { KaihAspect } from "@/src/types/kaih";
import { notification } from "@/src/utils/toast";

export default function EditKaihIndicatorPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { token } = useAuth();

  const [aspectId, setAspectId] = useState("");
  const [description, setDescription] = useState("");
  const [rubric, setRubric] = useState("");
  const [activeFlag, setActiveFlag] = useState(true);
  const [aspects, setAspects] = useState<KaihAspect[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);

  const loadAspects = useEffectEvent(async () => {
    if (!token) {
      return;
    }

    const { data, error } = await searchAspects({ token, page: 1, perPage: 1000 });
    if (error) {
      notification("Error!", error, "error");
      return;
    }

    setAspects(data);
  });

  const loadIndicator = useEffectEvent(async () => {
    if (!token || !params.id) {
      return;
    }

    setIsLoadingInitial(true);
    const { data, error } = await getIndicatorById({ token, id: params.id });
    setIsLoadingInitial(false);

    if (error || !data) {
      notification("Error!", error || "Indicator tidak ditemukan.", "error");
      router.push("/kaih-indicators");
      return;
    }

    setAspectId(data.aspect_id || "");
    setDescription(data.description || "");
    setRubric(data.rubric || "");
    setActiveFlag(Boolean(data.active_flag));
  });

  useEffect(() => {
    loadAspects();
    loadIndicator();
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
      notification("Error!", "ID indicator tidak valid.", "error");
      return;
    }

    if (!aspectId) {
      notification("Error!", "Aspect wajib dipilih.", "error");
      return;
    }

    setIsLoading(true);
    const { error } = await updateIndicator({
      token,
      id: params.id,
      aspectId,
      description,
      rubric,
      active: activeFlag,
    });
    setIsLoading(false);

    if (error) {
      notification("Error!", error, "error");
      return;
    }

    notification("Sukses!", "Indicator berhasil diperbarui.", "success");
    router.push("/kaih-indicators");
  };

  return (
    <div className="space-y-4">
      <BackButton name="KAIH Indicator" href="/kaih-indicators" />
      <HeaderList title="Edit Indicator" description="Ubah data indicator melalui form berikut." />

      <div className="max-w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800/70 dark:bg-slate-900/70">
        <form className="space-y-4">
          <SearchableSelect
            label="Aspect"
            placeholder="Cari aspect..."
            items={aspects}
            value={aspectId}
            onChange={setAspectId}
            itemsPerPage={8}
            disabled={isLoading || isLoadingInitial}
          />

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={isLoading || isLoadingInitial} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rubric">Rubric</Label>
            <Textarea id="rubric" value={rubric} onChange={(e) => setRubric(e.target.value)} disabled={isLoading || isLoadingInitial} />
          </div>

          <div className="flex items-center gap-2">
            <Input id="active_flag" type="checkbox" checked={activeFlag} onChange={(e) => setActiveFlag(e.target.checked)} disabled={isLoading || isLoadingInitial} className="h-4 w-4" />
            <Label htmlFor="active_flag">Aktif</Label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => router.push("/kaih-indicators")} disabled={isLoading || isLoadingInitial}>
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
