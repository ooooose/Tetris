import { useQuery } from 'react-query';
import axios from 'axios';
import { UserInfo } from '@/types/users';
import { useRouter } from 'next/router';

export const useQueryUser = () => {
  const router = useRouter();
  const getCurrentUser = async () => {
    const { data } = await axios.get<UserInfo>(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        withCredentials: true,
      },
    );
    return data;
  };

  return useQuery({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: Infinity,
    onError: () => router.push('/'),
  });
};
