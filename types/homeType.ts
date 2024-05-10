import { BusArrivalProps } from '@/types/busTypes';
import { ScheduleProps } from '@/types/calendarTypes';
import { MealType } from '@/types/mealTypes';

export interface HomeAnnouncementProps {
  announcementId: string;
  announcementTitle: string;
  announcementUrl: string;
}

export interface HomeBusProps extends BusArrivalProps {
  routeId: string;
  origin: string;
  destination: string;
}

export interface HomeMealProps {
  cafeteriaId: string;
  cafeteriaName: string;
  mealType: MealType;
  menus: string | null;
}

export interface HomeCalendarProps extends ScheduleProps {
  today: boolean;
}
