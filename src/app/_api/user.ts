import { AxiosError } from "axios";

import { getErrorMessage } from "@/src/utils";
import { User } from "@/types/common";

import { backendInstance } from ".";

export async function getUserById(
  userId: string,
): Promise<{ user: User | null; error: string }> {
  try {
    const response = await backendInstance.get(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = response.data as User;

    return { user, error: "" };
  } catch (error) {
    const err = error as AxiosError;
    return { user: null, error: getErrorMessage(err) };
  }
}
