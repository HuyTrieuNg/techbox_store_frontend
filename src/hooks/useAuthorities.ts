import useSWR from "swr";
import { api } from "@/lib/axios";
import { AuthorityResponse } from "@/types/authority";

const fetcher = (url: string) => api.get<AuthorityResponse>(url);

export function useAuthorities() {
  const { data, error, isLoading, mutate } = useSWR<AuthorityResponse>(
    "/users/me/authorities",
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    authorities: data,
    isLoading,
    isError: error,
    mutate,
  };
}
