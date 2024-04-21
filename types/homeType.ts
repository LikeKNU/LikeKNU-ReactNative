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
