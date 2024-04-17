import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_URL);

const http = axios.create({
  baseURL: API_URL,
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(
      `${error.config.method.toUpperCase()}:${error.config.url} Error : TIME(${new Date()})`,
    );
  },
);

http.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error(
      `${error.config.method.toUpperCase()}:${error.config.url} Error : TIME(${new Date()})`,
    );
  },
);

export default http;
