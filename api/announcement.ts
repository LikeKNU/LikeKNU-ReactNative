import useCampus from '@/common/hooks/useCampus';
import { campusName } from '@/constants/campus';
import { AnnouncementProps } from '@/types/announcementType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWRInfinite from 'swr/infinite';

export const useAnnouncements = (category: string) => {
  const { campus } = useCampus();
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    if (campus) {
      return `/api/announcements/${category}?campus=${campusName[campus].value}&page=${index + 1}`;
    }
  };

  const getAnnouncements = async (uri: string) => {
    const response = await http.get<AnnouncementProps[]>(uri);
    return extractBodyFromResponse<AnnouncementProps[]>(response) ?? [];
  };

  return useSWRInfinite(getKey, getAnnouncements, { initialSize: 1, revalidateFirstPage: false });
};

export const useAnnouncementsSearch = (keyword: string) => {
  const { campus } = useCampus();
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    if (campus) {
      // TODO change to search api
      return `/api/announcements?campus=${campusName[campus].value}&page=${index + 1}&keyword=${keyword}`;
    }
  };

  const searchAnnouncements = async (uri: string) => {
    const response = await http.get<AnnouncementProps[]>(uri);
    return extractBodyFromResponse<AnnouncementProps[]>(response) ?? [];
  };

  return useSWRInfinite(getKey, searchAnnouncements, { initialSize: 1, revalidateFirstPage: false });
};
