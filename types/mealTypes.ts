export type MealType = '아침' | '점심' | '저녁';

// export type CafeteriaType = '소담' | '늘솜' | '은행사/비전' | '드림' | '학생식당' | '직원식당' | '생활관식당';

export type OperatingStatus = 'prepare' | 'operate' | 'end';

export type OperatingType = {
  value: OperatingStatus;
  name: string;
}

export interface MealProps {
  cafeteriaId: string;
  cafeteriaName: string;
  date: string;
  meals: MenuProps[];
}

export interface MenuProps {
  menuId: string | null;
  mealType: MealType;
  operatingTime: string;
  menus: string | null;
}

export interface CafeteriaProps {
  cafeteriaId: string;
  cafeteriaName: string;
}
