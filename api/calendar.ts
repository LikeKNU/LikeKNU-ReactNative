import { CalendarProps } from '@/types/calendarTypes';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useCalendar = () => {
  const getCalendar = async (uri: string) => {
    const response = await http.get<CalendarProps[]>(uri);
    return extractBodyFromResponse<CalendarProps[]>(response) ?? [];
  };

  return useSWR('/api/schedule', getCalendar);
};
