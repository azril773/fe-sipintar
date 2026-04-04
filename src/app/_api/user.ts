import { AxiosError } from "axios";

import { User } from "@/src/types/users";
import { getErrorMessage } from "@/src/utils";

import { backendInstance } from ".";

export async function searchUsers({
  token,
}: {
  token: string;
}): Promise<{ data: User[]; error: string }> {
  try {
    const response = await backendInstance.get("/admin/api/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const { users } = response.data as { users: User[] };
    return { data: users, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], error: getErrorMessage(error) };
  }
}


// export async function getUserById(
//   userId: string,
// ): Promise<{ user: User | null; error: string }> {
//   try {
//     const response = await backendInstance.get(`/user/${userId}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const user = response.data as User;

//     return { user, error: "" };
//   } catch (error) {
//     const err = error as AxiosError;
//     return { user: null, error: getErrorMessage(err) };
//   }
// }
