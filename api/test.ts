import { ScheduleProps } from '@/types/scheduleType';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

const getSchedule = async (uri: string) => {
  const response = await http.get<ScheduleProps[]>(uri);
  return extractBodyFromResponse(response) ?? [];
};

export const useSchedules = () => {
  return useSWR('/api/schedule', getSchedule);
};
