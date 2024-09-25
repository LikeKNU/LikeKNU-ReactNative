import { useCampus } from '@/common/contexts/CampusContext';
import { Campuses, campusName } from '@/constants/campus';
import { cafeterias, Cafeterias } from '@/constants/meal';
import { MealProps } from '@/types/mealTypes';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR, { SWRConfiguration } from 'swr';

interface UseMealsOptions extends SWRConfiguration {
  enabled?: boolean;
}

export const useMeals = (cafeteria: Cafeterias, options: UseMealsOptions = {}) => {
  const { campus } = useCampus();
  const getMeals = async (uri: string, campus: Campuses | null, cafeteria: Cafeterias) => {
    if (campus && cafeterias[campus].includes(cafeteria)) {
      const response = await http.getWithParams<MealProps[]>(uri, {
        campus: campusName[campus].value,
        cafeteriaName: cafeteria
      });
      return extractBodyFromResponse<MealProps[]>(response) ?? [];
    }
  };

  const shouldFetch = options.enabled !== false;

  return useSWR(shouldFetch ? ['/api/menus', campus, cafeteria] : null, ([uri, campus, cafeteria]) => getMeals(uri, campus, cafeteria));
};
