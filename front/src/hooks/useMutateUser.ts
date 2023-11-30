import axios from 'axios';
import { useAppDispatch } from '@/stores/app/hooks';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { toggleCsrfState } from '@/slices/appSlice';

type UpdateUser = {
  id: number | undefined;
  score: number;
};

export const useMutateUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const addScoreMutation = useMutation(
    ({ id, score }: UpdateUser) =>
      axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/score`,
        {
          score: score,
        },
        {
          withCredentials: true,
        },
      ),
    {
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState());
          router.push('/');
        }
      },
    },
  );

  return {
    addScoreMutation,
  };
};
