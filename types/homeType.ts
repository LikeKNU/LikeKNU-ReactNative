import { BusArrivalProps } from '@/types/busType';
import { CalendarProps } from '@/types/calendarType';

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
  mealType: '아침' | '점심' | '저녁';
  menus: string | null;
}

export interface HomeCalendarProps extends CalendarProps {
  today: boolean;
}
