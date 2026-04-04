import { AxiosError } from "axios";

import { BASE_URL } from "@/src/constants";
import { UUID } from "@/types/common";
import { Paud } from "@/types/paud";
import { getErrorMessage } from "@/utils/index";

import { backendInstance } from ".";

const API_URL = `${BASE_URL}/admin/api/pauds`;

type SearchPaudsResponse = {
  pauds: Paud[];
  total: number;
  error: string;
};
export async function searchPauds({
  token,
}: {
  token: string;
}): Promise<{ data: Paud[]; totalPages: number; error: string }> {
  try {
    const response = await backendInstance.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { pauds, total }: SearchPaudsResponse = response.data;
    const totalPages = Math.ceil(total / 10);
    return { data: pauds, totalPages, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], totalPages: 0, error: getErrorMessage(error) };
  }
}

export async function getPaudById(
  paudId: UUID,
  token: string,
): Promise<{ data: Paud | null; error: string }> {
  try {
    const response = await backendInstance.get(`${API_URL}/${paudId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data as Paud;
    return { data, error: "" };
  } catch (error) {
    const err = error as AxiosError;
    return { data: null, error: getErrorMessage(err) };
  }
}

export async function createPaud(
  name: string,
  subdomain: string,
  file: File | null,
  token: string,
): Promise<{ data: Paud | null; error: string }> {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("subdomain", subdomain);
    if (file) {
      formData.append("logo", file);
    }
    console.log(formData);

    const response = await backendInstance.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    const { paud } = response.data as { paud: Paud };
    return { data: paud, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function activatePaud(
  paudId: UUID,
  token: string,
): Promise<{ error: string }> {
  try {
    await backendInstance.post(`${API_URL}/${paudId}/activate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { error: "" };
  } catch (error) {
    const err = error as AxiosError;
    return { error: getErrorMessage(err) };
  }
}
export async function suspendPaud(
  paudId: UUID,
  token: string,
): Promise<{ error: string }> {
  try {
    await backendInstance.post(`${API_URL}/${paudId}/suspend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { error: "" };
  } catch (error) {
    const err = error as AxiosError;
    return { error: getErrorMessage(err) };
  }
}
