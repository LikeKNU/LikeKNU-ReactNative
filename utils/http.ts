import { APIResponse } from '@/types/response';
import axios, { AxiosResponse } from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_API_URL : process.env.EXPO_PUBLIC_ANDROID_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      `${error.config.method.toUpperCase()}:${error.config.url} Error : TIME(${new Date()})\n\n${error}`,
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

export const extractBodyFromResponse = <T>(response: AxiosResponse<APIResponse<T>>) => {
  return response.data.data.body;
};

export const extractMessageFromResponse = (response: AxiosResponse<APIResponse<any>>) => {
  return response.data.message;
};

const http = {
  get: <T>(uri: string) => {
    return instance.get<APIResponse<T>>(uri);
  },
  getWithParams: <T>(uri: string, params: any) => {
    return instance.get<APIResponse<T>>(uri, { params: params })
  },
  post: <T, D>(uri: string, data?: D) => {
    return instance.post<APIResponse<T>, D>(uri, data);
  },
  postWithParams: <T, D>(uri: string, data?: D, params?: any) => {
    return instance.post<APIResponse<T>, D>(uri, data, { params: params });
  },
  put: <T, D>(uri: string, data?: D) => {
    return instance.put<APIResponse<T>, D>(uri, data);
  },
  putWithParams: <T, D>(uri: string, data?: D, params?: any) => {
    return instance.put<APIResponse<T>, D>(uri, data, { params: params });
  },
  delete: <T>(uri: string) => {
    return instance.delete<APIResponse<T>>(uri);
  },
  deleteWithParams: <T>(uri: string, params?: any) => {
    return instance.delete<APIResponse<T>>(uri, { params: params });
  }
};

export default http;
