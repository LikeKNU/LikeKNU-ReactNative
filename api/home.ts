import { HomeAnnouncementProps, HomeBusProps } from '@/types/homeType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

const getHomeAnnouncements = async (uri: string) => {
  // TODO apply useCampus
  const response = await http.getWithParams<HomeAnnouncementProps[]>(uri, { campus: 'CHEONAN' });
  return extractBodyFromResponse<HomeAnnouncementProps[]>(response) ?? [];
};

export const useHomeAnnouncements = () => {
  return useSWR('/api/main/announcements', getHomeAnnouncements);
};

const getHomeBuses = async (uri: string) => {
  // TODO apply useCampus
  const response = await http.getWithParams<HomeBusProps[]>(uri, { campus: 'CHEONAN' })
  return extractBodyFromResponse<HomeBusProps[]>(response) ?? [];
};

export const useHomeBuses = () => {
  return useSWR('/api/main/buses', getHomeBuses);
};
