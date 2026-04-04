import { AxiosError } from "axios";

import { Paud } from "@/types/paud";
import { getErrorMessage } from "@/utils/index";

import { backendInstance } from ".";

export async function searchPauds({
  token,
}: {
  token: string;
}): Promise<{ data: Paud[]; error: string }> {
  try {
    const response = await backendInstance.get("/admin/api/pauds", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { pauds } = response.data as { pauds: Paud[] };
    return { data: pauds, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], error: getErrorMessage(error) };
  }
}
