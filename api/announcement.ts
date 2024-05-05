import { useCampus } from '@/common/contexts/CampusContext';
import { campusName } from '@/constants/campus';
import { AnnouncementProps } from '@/types/announcementType';
import { useDeviceId } from '@/utils/device';
import http, { extractBodyFromResponse, extractMessageFromResponse } from '@/utils/http';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export const useAnnouncements = (category: string) => {
  const { campus } = useCampus();
  const { deviceId } = useDeviceId();
  const getKey = (index: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    if (campus && deviceId) {
      return `/api/announcements/${category}?campus=${campusName[campus].value}&page=${index + 1}&deviceId=${deviceId}`;
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
      return `/api/announcements?campus=${campusName[campus].value}&page=${index + 1}&keyword=${keyword}`;
    }
  };

  const searchAnnouncements = async (uri: string) => {
    const response = await http.get<AnnouncementProps[]>(uri);
    return extractBodyFromResponse<AnnouncementProps[]>(response) ?? [];
  };

  return useSWRInfinite(getKey, searchAnnouncements, { initialSize: 1, revalidateFirstPage: false });
};

export const useBookmarkAnnouncements = () => {
  const { deviceId } = useDeviceId();
  const getBookmarkAnnouncements = async (uri: string, deviceId: string | null) => {
    if (deviceId) {
      const response = await http.get<AnnouncementProps[]>(`${uri}/${deviceId}`);
      return extractBodyFromResponse<AnnouncementProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/bookmarks', deviceId], ([uri, deviceId]) => getBookmarkAnnouncements(uri, deviceId));
};

export const addBookmark = async (announcementId: string, deviceId: string) => {
  const response = await http.post<string, any>(`/api/bookmarks/${deviceId}`, { announcementId: announcementId });
  return extractMessageFromResponse(response);
};

export const removeBookmark = async (announcementId: string, deviceId: string) => {
  const response = await http.delete<string>(`/api/bookmarks/${deviceId}/${announcementId}`);
  return extractMessageFromResponse(response);
};
