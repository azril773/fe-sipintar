import { AxiosError } from "axios";

import { KaihAspect } from "@/src/types/kaih";
import { getErrorMessage } from "@/src/utils";

import { backendInstance } from ".";

const API_URL = "/admin/api/kaih_aspects";


type KaihAspectResponse = {
    items: KaihAspect[];
    total : number 
}
export async function searchAspects({ token, page, perPage, search }: { token: string; page?: number; perPage?: number; search?: string; }): Promise<{ data: KaihAspect[]; total: number; totalPages: number; error: string }> {
  try {
    const effectivePerPage = perPage ?? 10;
    const params: Record<string, string | number> = { page: page ?? 1, per_page: effectivePerPage };
    if (search && search.trim()) params.search = search;

    const res = await backendInstance.get(API_URL, { headers: { Authorization: `Bearer ${token}` }, params });
    const { items, total } : KaihAspectResponse = res.data;
    return { data: items, total, totalPages: Math.ceil(total / effectivePerPage), error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], total: 0, totalPages: 0, error: getErrorMessage(error) };
  }
}

export async function createAspect({ token, name, description, sequenceNo }: { token: string; name: string; description?: string | null; sequenceNo?: number; }): Promise<{ data: KaihAspect | null; error: string }> {
  try {
    const res = await backendInstance.post(API_URL, { name, description, sequence_no: sequenceNo ?? 0 }, { headers: { Authorization: `Bearer ${token}` } });
    return { data: res.data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getAspectById({ token, id }: { token: string; id: string; }): Promise<{ data: KaihAspect | null; error: string }> {
  try {
    const res = await backendInstance.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return { data: res.data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateAspect({ token, id, name, description, sequenceNo }: { token: string; id: string; name: string; description?: string | null; sequenceNo?: number; }): Promise<{ error: string }> {
  try {
    await backendInstance.put(`${API_URL}/${id}`, { name, description, sequence_no: sequenceNo ?? 0 }, { headers: { Authorization: `Bearer ${token}` } });
    return { error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { error: getErrorMessage(error) };
  }
}

export async function deleteAspect({ token, id }: { token: string; id: string; }): Promise<{ error: string }> {
  try {
    await backendInstance.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return { error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { error: getErrorMessage(error) };
  }
}
