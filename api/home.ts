import { HomeAnnouncementProps } from '@/types/homeType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

const getHomeAnnouncements = async (uri: string) => {
  const response = await http.getWithParams<HomeAnnouncementProps[]>(uri, { campus: 'CHEONAN' });
  return extractBodyFromResponse(response) ?? [];
};

export const useHomeAnnouncements = () => {
  return useSWR('/api/main/announcements', getHomeAnnouncements);
};
