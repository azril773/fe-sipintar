import { AxiosError } from "axios";

import { Base } from "@/src/types/common";
import { getErrorMessage } from "@/src/utils";

import { backendInstance } from ".";

const ROLE_API_URL = "/admin/api/roles";

export type Role = Base & {
  id: string;
  name: string;
};



export async function searchRoles({
  token,
}: {
  token: string;
}): Promise<{ data: Role[]; error: string }> {
  try {
    const response = await backendInstance.get(ROLE_API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data as Role[];
    return { data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], error: getErrorMessage(error) };
  }
}