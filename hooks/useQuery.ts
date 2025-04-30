"use client";

import { SWROptions } from "@/interfaces";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default function useQuery<T>(url: string | null, options?: SWROptions) {
  const { data, error, mutate, isLoading } = useSWR<T>(url, fetcher, options);
  return { data, error, mutate, isLoading };
}
