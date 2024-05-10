import { useCampus } from '@/common/contexts/CampusContext';
import { Campuses, campusName } from '@/constants/campus';
import { cafeterias, Cafeterias } from '@/constants/meal';
import { MealProps } from '@/types/mealTypes';
import http, { extractBodyFromResponse } from '@/utils/http';
import useSWR from 'swr';

export const useMeals = (cafeteria: Cafeterias) => {
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

  return useSWR(['/api/menus', campus, cafeteria], ([uri, campus, cafeteria]) => getMeals(uri, campus, cafeteria));
};
