import { useDeviceId } from '@/utils/device';
import http, { extractBodyFromResponse, extractMessageFromResponse } from '@/utils/http';
import useSWR from 'swr';

export interface KeywordResponse {
  keyword: string;
  createdAt: string;
}

export const useKeywords = () => {
  const { deviceId } = useDeviceId();

  const fetcher = async (uri: string, deviceId: string | null) => {
    if (!deviceId) return [];
    const response = await http.getWithParams<KeywordResponse[]>(uri, { deviceId });
    return extractBodyFromResponse<KeywordResponse[]>(response) ?? [];
  };

  return useSWR(['/api/keywords', deviceId], ([uri, deviceId]) => fetcher(uri, deviceId));
};

export const addKeyword = async (deviceId: string, keyword: string) => {
  const response = await http.post<string, any>('/api/keywords', { deviceId, keyword });
  return extractMessageFromResponse(response);
};

export const removeKeyword = async (deviceId: string, keyword: string) => {
  const response = await http.deleteWithParams<string>('/api/keywords', { deviceId, keyword });
  return extractMessageFromResponse(response);
};
