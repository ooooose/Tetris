import { useEffect } from 'react'
import axios from 'axios';
import { CsrfToken } from '@/types/csrf'
import { selectCsrfState } from '@/slices/appSlice'
import { useAppSelector } from '@/stores/app/hooks'
import { apiClient } from '@/utils/api-client'

export function CsrfProviders({ children }: { children: React.ReactNode }) {
  const csrf = useAppSelector(selectCsrfState);
  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await apiClient.apiGet<CsrfToken>(`${process.env.NEXT_PUBLIC_API_URL}/csrf-token`)
      console.log(res.data.csrf_token)
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token
    }
    getCsrfToken()
  }, [csrf])
  return (
    <>
      {children}
    </>
  )
}