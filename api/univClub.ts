import { Club, ClubListProps } from '@/types/univClubTypes';
import univClubHttp from '@/utils/univClubHttp';
import useSWR from 'swr';

export const useClubs = () => {
  const getClubs = async (uri: string) => {
    const response = await univClubHttp.get<ClubListProps[]>(uri);
    return response.data ?? [];
  };

  return useSWR('/api/v1/clubs', getClubs);
};

export const useClubDetails = (clubId: number) => {
  const getClubDetails = async (uri: string) => {
    const response = await univClubHttp.get<Club>(uri);
    return response.data ?? {};
  };

  return useSWR(`/api/v1/clubs/${clubId}`, getClubDetails);
};
