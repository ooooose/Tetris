import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAppDispatch } from '@/stores/app/hooks';
import { toggleCsrfState } from '@/slices/appSlice';
import { User, AuthUser } from '@/types/users';
import { apiClient } from '@/utils/api-client';
import axios from 'axios';

export const useMutateAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation(
    async (user: AuthUser) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, user, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        router.push('/menu');
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    },
  );

  const registerMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`, user),
    {
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        console.log(err.response.data.detail);
        if (err.response.data.detail === 'The CSRF token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    },
  );

  const logoutMutation = useMutation(
    async () =>
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        },
      ),
    {
      onSuccess: () => {
        router.push('/');
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF has expired.') {
          dispatch(toggleCsrfState());
          router.push('/');
        }
      },
    },
  );

  return { loginMutation, registerMutation, logoutMutation };
};
