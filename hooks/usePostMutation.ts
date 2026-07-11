import { api } from "@/lib/api";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

type ApiError = AxiosError<{
  success: boolean;
  message: string;
}>;

export const usePostMutation = <TResponse = unknown, TVariables = unknown>(
  url: string,
  options?: UseMutationOptions<TResponse, ApiError, TVariables>,
): UseMutationResult<TResponse, ApiError, TVariables> => {
  return useMutation<TResponse, ApiError, TVariables>({
    mutationFn: async (data: TVariables) => {
      const response = await api.post<TResponse>(url, data);
      return response.data;
    },
    ...options,
  });
};
