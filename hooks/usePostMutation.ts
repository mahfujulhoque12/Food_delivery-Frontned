import { api } from "@/lib/api";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";

type MutationProps<TResponse, TVariables> = {
  url: string;
  invalidateQuery?: (string | number)[];
  options?: UseMutationOptions<TResponse, ApiError, TVariables>;
};

export const usePostMutation = <TResponse = unknown, TVariables = unknown>({
  url,
  invalidateQuery = [],
  options,
}: MutationProps<TResponse, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TVariables) => {
      const response = await api.post<TResponse>(url, data);
      return response.data;
    },

    onSuccess: (...args) => {
      if (invalidateQuery) {
        queryClient.invalidateQueries({
          queryKey: invalidateQuery,
        });
      }

      options?.onSuccess?.(...args);
    },

    ...options,
  });
};
