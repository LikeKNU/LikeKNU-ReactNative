import { BusArrivalProps } from '@/types/busType';

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
