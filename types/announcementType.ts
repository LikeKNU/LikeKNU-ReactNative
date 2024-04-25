import { HomeAnnouncementProps } from '@/types/homeType';

export interface AnnouncementProps extends HomeAnnouncementProps {
  announcementDate: string;
  announcementTag: string;
}

export type Category = {
  value: string;
  name: string;
}
