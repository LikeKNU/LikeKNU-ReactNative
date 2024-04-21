import { HomeAnnouncementProps, HomeBusProps, HomeCalendarProps, HomeMealProps } from '@/types/homeType';
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
  const response = await http.getWithParams<HomeBusProps[]>(uri, { campus: 'CHEONAN' });
  return extractBodyFromResponse<HomeBusProps[]>(response) ?? [];
};

export const useHomeBuses = () => {
  return useSWR('/api/main/buses', getHomeBuses);
};

const getHomeMeals = async (uri: string) => {
  const response = await http.getWithParams<HomeMealProps[]>(uri, { campus: 'SINGWAN' });
  return extractBodyFromResponse<HomeMealProps[]>(response) ?? [];
};

export const useHomeMeal = () => {
  return useSWR('/api/main/menu', getHomeMeals);
};

const getHomeCalendar = async (uri: string) => {
  const response = await http.get<HomeCalendarProps[]>(uri);
  return extractBodyFromResponse<HomeCalendarProps[]>(response) ?? [];
};

export const useHomeCalendar = () => {
  return useSWR('/api/main/schedule', getHomeCalendar);
};
