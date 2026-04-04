import { AxiosError } from "axios";

export function getErrorMessage(error: AxiosError): string {
  return error.response?.data
    ? (error.response.data as { error: string }).error
    : error.message;
}
