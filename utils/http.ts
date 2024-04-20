import { APIResponse } from '@/types/response';
import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      `${error.config.method.toUpperCase()}:${error.config.url} Error : TIME(${new Date()})`,
    );
  },
);

instance.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(
      `${error.config.method.toUpperCase()}:${error.config.url} Error : TIME(${new Date()})`,
    );
  },
);

export const extractBodyFromResponse = (response: AxiosResponse<APIResponse<any>>) => {
  return response.data.data.body;
};

const http = {
  get: <T>(uri: string) => {
    return instance.get<APIResponse<T>>(uri);
  },
  getWithParams: <T>(uri: string, params: any) => {
    return instance.get<APIResponse<T>>(uri, { params: params })
  },
};

export default http;
