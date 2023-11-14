import { useEffect } from 'react';
import axiosBase from 'axios';
import { CsrfToken } from '@/types/csrf';
import { selectCsrfState } from '@/slices/appSlice';
import { useAppSelector } from '@/stores/app/hooks';
import { apiClient } from '@/utils/api-client';
import axios from 'axios';

export function CsrfProviders({ children }: { children: React.ReactNode }) {
  const csrf = useAppSelector(selectCsrfState);
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.NEXT_PUBLIC_API_URL}/csrf-token`,
      );

      axiosBase.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': res.data.csrf_token,
        'Access-Control-Allow-Credentials': true,
      };
    };
    getCsrfToken();
  }, [csrf]);
  return <>{children}</>;
}
