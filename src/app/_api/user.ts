import { AxiosError } from "axios";

import { User } from "@/src/types/users";
import { getErrorMessage } from "@/src/utils";

import { backendInstance } from ".";

const API_URL = "/admin/api/users";

type SearchUsersResponse = {
  users: User[];
  total: number;
};

export async function searchUsers({
  token,
  page,
  perPage,
  search,
}: {
  token: string;
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<{ data: User[]; total: number; totalPages: number; error: string }> {
  try {
    const effectivePerPage = perPage ?? 5;
    const params: Record<string, string | number> = {
      page: page ?? 1,
      per_page: effectivePerPage,
    };

    if (search && search.trim()) {
      params.search = search;
    }

    const response = await backendInstance.get(API_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    const { users, total }: SearchUsersResponse = response.data;
    const totalPages = Math.ceil(total / effectivePerPage);
    return { data: users, total, totalPages, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: [], total: 0, totalPages: 0, error: getErrorMessage(error) };
  }
}

export async function createUser({
  token,
  name,
  email,
  password,
  roleId,
  paudId,
}: {
  token: string;
  name: string;
  email: string;
  password: string;
  roleId: string;
  paudId?: string | null;
}): Promise<{ data: User | null; error: string }> {
  try {
    const response = await backendInstance.post(
      API_URL,
      {
        name,
        email,
        password,
        role_id: roleId,
        paud_id: paudId ?? null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = response.data as User;
    return { data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function getUserById({
  token,
  userId,
}: {
  token: string;
  userId: string;
}): Promise<{ data: User | null; error: string }> {
  try {
    const response = await backendInstance.get(`${API_URL}/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data as User;
    return { data, error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { data: null, error: getErrorMessage(error) };
  }
}

export async function updateUser({
  token,
  userId,
  name,
  email,
  roleId,
  paudId,
}: {
  token: string;
  userId: string;
  name: string;
  email: string;
  roleId: string;
  paudId?: string | null;
}): Promise<{ error: string }> {
  try {
    await backendInstance.put(
      `${API_URL}/${userId}`,
      {
        name,
        email,
        role_id: roleId,
        paud_id: paudId ?? null,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return { error: "" };
  } catch (err) {
    const error = err as AxiosError;
    return { error: getErrorMessage(error) };
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
