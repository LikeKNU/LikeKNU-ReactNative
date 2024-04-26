import useCampus from '@/common/hooks/useCampus';
import { RouteType } from '@/constants/bus';
import { Campuses, campusName } from '@/constants/campus';
import { CityBusProps } from '@/types/busTypes';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useCityBuses = () => {
  const { campus } = useCampus();
  const getCityBuses = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<CityBusProps[]>(uri, { campus: campusName[campus].value });
      return extractBodyFromResponse<CityBusProps[]>(response) ?? [];
    }
  };

  const {
    data: outgoingData,
    mutate: outgoingMutate
  } = useSWR([`/api/buses/city-bus/${RouteType.OUTGOING}`, campus], ([uri, campus]) => getCityBuses(uri, campus));
  const {
    data: incomingData,
    mutate: incomingMutate
  } = useSWR([`/api/buses/city-bus/${RouteType.INCOMING}`, campus], ([uri, campus]) => getCityBuses(uri, campus));

  const mutate = async () => {
    await outgoingMutate();
    await incomingMutate();
  };

  return {outgoingData, incomingData, mutate}
};
