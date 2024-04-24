import useCampus from '@/common/hooks/useCampus';
import { Categories } from '@/constants/announcement';
import { Campuses, campusName } from '@/constants/campus';
import { AnnouncementProps } from '@/types/announcementType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useAnnouncements = (category: Categories) => {
  const { campus } = useCampus();
  const getHomeAnnouncements = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<AnnouncementProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<AnnouncementProps[]>(response) ?? [];
    }
  };

  return useSWR([`/api/announcements/${category}`, campus], ([uri, campus]) => getHomeAnnouncements(uri, campus));
};
