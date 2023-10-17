import useSWR, { SWRResponse } from 'swr';
import { apiClient } from '@/utils/api-client';
import { User } from '@/types/users';

export const useGetUsers = (): SWRResponse<User[] | undefined> => {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/ranking`,
    (endpoint) =>
      apiClient.apiGet<User[]>(endpoint).then((result) => result.data),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
}