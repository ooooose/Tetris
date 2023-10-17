import axiosBase, { AxiosInstance, AxiosResponse} from 'axios';

class ApiClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Credentials': true,
      },
      responseType: 'json',
    })
  }

  async apiGet<T>(url: string, query = {}): Promise<AxiosResponse<T>> {
    return await this.axios.get<T>(url, {...query});
  }

  async apiPost<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.post(url, body);
  }

  async apiPut<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.put<T>(`/api/v1${url}`, body);
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.delete<T>(`/api/v1${url}`, { data: body });
  }
}

export const apiClient = new ApiClient();