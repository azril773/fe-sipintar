import { AxiosError } from "axios";

import { KaihIndicator } from "@/src/types/kaih";
import { getErrorMessage } from "@/src/utils";

import { backendInstance } from ".";

const API_URL = "/admin/api/kaih_indicators";

export async function searchIndicators({ token, page, perPage, search, aspectId }: { token: string; page?: number; perPage?: number; search?: string; aspectId?: string; }): Promise<{ data: KaihIndicator[]; total: number; totalPages: number; error: string }> {
  try {
    const effectivePerPage = perPage ?? 10;
    const params: Record<string, string | number> = { page: page ?? 1, per_page: effectivePerPage };
    if (search && search.trim()) params.search = search;
    if (aspectId) params.aspect_id = aspectId;

    const res = await backendInstance.get(API_URL, { headers: { Authorization: `Bearer ${token}` }, params });
    const { items, total } = res.data;
    return { data: items, total, totalPages: Math.ceil(total / effectivePerPage), error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], total: 0, totalPages: 0, error: getErrorMessage(error) };
  }
}

export async function createIndicator({ token, aspectId, description, rubric, active }: { token: string; aspectId: string; description: string; rubric: string; active?: boolean; }): Promise<{ data: KaihIndicator | null; error: string }> {
  try {
    const res = await backendInstance.post(API_URL, { aspect_id: aspectId, description, rubric, active: active ?? true }, { headers: { Authorization: `Bearer ${token}` } });
    return { data: res.data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getIndicatorById({ token, id }: { token: string; id: string; }): Promise<{ data: KaihIndicator | null; error: string }> {
  try {
    const res = await backendInstance.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return { data: res.data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateIndicator({ token, id, aspectId, description, rubric, active }: { token: string; id: string; aspectId: string; description: string; rubric: string; active?: boolean; }): Promise<{ error: string }> {
  try {
    await backendInstance.put(`${API_URL}/${id}`, { aspect_id: aspectId, description, rubric, active: active ?? true }, { headers: { Authorization: `Bearer ${token}` } });
    return { error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { error: getErrorMessage(error) };
  }
}

export async function deleteIndicator({ token, id }: { token: string; id: string; }): Promise<{ error: string }> {
  try {
    await backendInstance.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return { error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { error: getErrorMessage(error) };
  }
}
