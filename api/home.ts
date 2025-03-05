import { useCampus } from '@/common/contexts/CampusContext';
import { Campuses, campusName } from '@/constants/campus';
import { HomeAnnouncementProps, HomeBusProps, HomeCalendarProps, HomeMealProps } from '@/types/homeType';
import http, { extractBodyFromResponse, extractMessageFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useHomeAnnouncements = () => {
  const { campus } = useCampus();
  const getHomeAnnouncements = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<HomeAnnouncementProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<HomeAnnouncementProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/main/announcements', campus], ([uri, campus]) => getHomeAnnouncements(uri, campus));
};

export const useHomeBuses = () => {
  const { campus } = useCampus();
  const getHomeBuses = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<HomeBusProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<HomeBusProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/main/buses', campus], ([uri, campus]) => getHomeBuses(uri, campus));
};

export const useHomeMeal = () => {
  const { campus } = useCampus();
  const getHomeMeals = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<HomeMealProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<HomeMealProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/v2/main/menus', campus], ([uri, campus]) => getHomeMeals(uri, campus));
};

export const useHomeCalendar = () => {
  const getHomeCalendar = async (uri: string) => {
    const response = await http.get<HomeCalendarProps[]>(uri);
    return extractBodyFromResponse<HomeCalendarProps[]>(response) ?? [];
  };

  return useSWR('/api/main/schedule', getHomeCalendar);
};

export const useHomeMessage = () => {
  const getHomeMessage = async (uri: string) => {
    const response = await http.get<string>(uri);
    return extractMessageFromResponse(response) ?? '';
  };

  return useSWR('/api/main/messages', getHomeMessage);
};
