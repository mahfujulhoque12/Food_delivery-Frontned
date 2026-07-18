import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { toast } from "sonner";

type UseDeleteMutationProps = {
  url: string;
  invalidateQueries?: (string | number)[][];
  onSuccess?: (data: unknown) => void;
  onError?: (error: AxiosError) => void;
};

export const useDeleteMutation = ({
  url,
  invalidateQueries = [],
  onSuccess,
  onError,
}: UseDeleteMutationProps) => {
  const queryClient = useQueryClient();

  type ApiResponse = {
    success: boolean;
    message: string;
  };

  type ApiError = {
    success: boolean;
    message: string;
  };
  return useMutation<ApiResponse, AxiosError<ApiError>, string>({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse>(`${url}/${id}`);
      return data;
    },

    onSuccess: (data) => {
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      toast.success(data.message || "Deleted successfully");

      onSuccess?.(data);
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");

      onError?.(error);
    },
  });
};
