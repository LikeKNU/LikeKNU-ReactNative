import useCampus from '@/common/hooks/useCampus';
import { campusName } from '@/constants/campus';
import { HomeAnnouncementProps, HomeBusProps, HomeCalendarProps, HomeMealProps } from '@/types/homeType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useHomeAnnouncements = () => {
  const { campus } = useCampus();
  const getHomeAnnouncements = async (uri: string) => {
    const response = await http.getWithParams<HomeAnnouncementProps[]>(uri, { campus: campusName[campus].value });
    return extractBodyFromResponse<HomeAnnouncementProps[]>(response) ?? [];
  };

  return useSWR('/api/main/announcements', getHomeAnnouncements);
};

export const useHomeBuses = () => {
  const { campus } = useCampus();
  const getHomeBuses = async (uri: string) => {
    const response = await http.getWithParams<HomeBusProps[]>(uri, { campus: campusName[campus].value });
    return extractBodyFromResponse<HomeBusProps[]>(response) ?? [];
  };

  return useSWR('/api/main/buses', getHomeBuses);
};

export const useHomeMeal = () => {
  const { campus } = useCampus();
  const getHomeMeals = async (uri: string) => {
    const response = await http.getWithParams<HomeMealProps[]>(uri, { campus: campusName[campus].value });
    return extractBodyFromResponse<HomeMealProps[]>(response) ?? [];
  };

  return useSWR('/api/main/menu', getHomeMeals);
};

const getHomeCalendar = async (uri: string) => {
  const response = await http.get<HomeCalendarProps[]>(uri);
  return extractBodyFromResponse<HomeCalendarProps[]>(response) ?? [];
};

export const useHomeCalendar = () => {
  return useSWR('/api/main/schedule', getHomeCalendar);
};
