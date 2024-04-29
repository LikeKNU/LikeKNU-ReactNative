import useCampus from '@/common/hooks/useCampus';
import { RouteType } from '@/constants/bus';
import { Campuses, campusName } from '@/constants/campus';
import { CityBusProps } from '@/types/busTypes';
import { ValueNameType } from '@/types/common';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useCityBuses = (routeType: ValueNameType) => {
  const { campus } = useCampus();
  const getCityBuses = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<CityBusProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<CityBusProps[]>(response) ?? [];
    }
  };

  return useSWR([`/api/buses/city-bus/${routeType.value}`, campus], ([uri, campus]) => getCityBuses(uri, campus));
};
