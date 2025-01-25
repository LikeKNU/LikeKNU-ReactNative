import axios from 'axios';

export const API_URL = process.env.EXPO_PUBLIC_UNIV_CLUB_SERVER_URL;

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

const univClubHttp = {
  get: <T>(uri: string) => {
    return instance.get(uri);
  },
  getWithParams: <T>(uri: string, params: any) => {
    return instance.get(uri, { params: params })
  },
  post: <T, D>(uri: string, data?: D) => {
    return instance.post(uri, data);
  },
  postWithParams: <T, D>(uri: string, data?: D, params?: any) => {
    return instance.post(uri, data, { params: params });
  },
  put: <T, D>(uri: string, data?: D) => {
    return instance.put(uri, data);
  },
  putWithParams: <T, D>(uri: string, data?: D, params?: any) => {
    return instance.put(uri, data, { params: params });
  },
  delete: <T>(uri: string) => {
    return instance.delete(uri);
  },
  deleteWithParams: <T>(uri: string, params?: any) => {
    return instance.delete(uri, { params: params });
  }
};

export default univClubHttp;
