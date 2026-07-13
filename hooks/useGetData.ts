// hooks/useGetData.ts

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";

type UseGetDataProps<T> = {
  queryKey: (string | number)[];
  url: string;
  params?: Record<string, any>;
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;
};

export const useGetData = <T>({
  queryKey,
  url,
  params,
  options,
}: UseGetDataProps<T>) => {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      const { data } = await api.get<T>(url, {
        params,
      });
      return data;
    },
    ...options,
  });
};
