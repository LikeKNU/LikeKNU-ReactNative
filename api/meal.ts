import { useCampus } from '@/common/contexts/CampusContext';
import { Campuses, campusName } from '@/constants/campus';
import { CafeteriaProps, MealProps, MenuRatingProps } from '@/types/mealTypes';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR, { SWRConfiguration } from 'swr';

interface UseMealsOptions extends SWRConfiguration {
  enabled?: boolean;
}

interface UseMenuRatingOptions extends SWRConfiguration {
  enabled?: boolean;
}

export const useCafeterias = () => {
  const { campus } = useCampus();
  const getCafeterias = async (uri: string, campus: Campuses | null) => {
    if (campus) {
      const response = await http.getWithParams<CafeteriaProps[]>(uri, {
        campus: campusName[campus].value
      });
      return extractBodyFromResponse<CafeteriaProps[]>(response) ?? [];
    }
  };

  return useSWR(['/api/v2/menus/cafeterias', campus], ([uri, campus]) => getCafeterias(uri, campus));
};

export const useMeals = (cafeteria: CafeteriaProps, options: UseMealsOptions = {}) => {
  const { campus } = useCampus();
  const getMeals = async (uri: string, campus: Campuses | null, cafeteria: CafeteriaProps) => {
    if (campus && cafeteria) {
      const response = await http.getWithParams<MealProps[]>(uri, {
        campus: campusName[campus].value,
        cafeteriaId: cafeteria.cafeteriaId
      });
      return extractBodyFromResponse<MealProps[]>(response) ?? [];
    }
  };

  const shouldFetch = options.enabled !== false;

  return useSWR(shouldFetch ? ['/api/v2/menus', campus, cafeteria] : null, ([uri, campus, cafeteria]) => getMeals(uri, campus, cafeteria));
};

export const useMenuRating = (menuId: string | null, deviceId: string | null, options: UseMenuRatingOptions = {}) => {
  const getRating = async (uri: string, deviceId: string) => {
    const response = await http.getWithParams<MenuRatingProps>(uri, { deviceId });
    return extractBodyFromResponse<MenuRatingProps>(response) ?? null;
  };

  const shouldFetch = options.enabled !== false && !!menuId && !!deviceId;
  return useSWR(
    shouldFetch ? [`/api/v2/menus/${menuId}/rating`, deviceId] : null,
    ([uri, deviceId]) => getRating(uri, deviceId!)
  );
};

export const updateMenuRating = async (menuId: string, deviceId: string, rating: number) => {
  const response = await http.put<MenuRatingProps, { deviceId: string; rating: number }>(
    `/api/v2/menus/${menuId}/rating`,
    { deviceId, rating }
  );
  return extractBodyFromResponse<MenuRatingProps>(response);
};
