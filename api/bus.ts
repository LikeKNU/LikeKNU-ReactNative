import useCampus from '@/common/hooks/useCampus';
import { Campuses, campusName } from '@/constants/campus';
import { CityBusProps, ShuttleBusProps, ShuttleRouteProps } from '@/types/busTypes';
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

export const useShuttleRoutes = () => {
  const { campus } = useCampus();
  const getShuttleRoutes = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<ShuttleRouteProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<ShuttleRouteProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/buses/shuttle-bus/routes', campus], ([uri, campus]) => getShuttleRoutes(uri, campus));
};

export const useShuttleBuses = (shuttleId: string) => {
  const getShuttleBuses = async (uri: string) => {
    const response = await http.get<ShuttleBusProps[]>(uri);
    return extractBodyFromResponse<ShuttleBusProps[]>(response) ?? [];
  };

  return useSWR(`/api/buses/shuttle-bus/${shuttleId}`, getShuttleBuses);
};
