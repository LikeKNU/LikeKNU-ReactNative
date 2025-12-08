import { HomeAnnouncementProps } from '@/types/homeType';

export interface AnnouncementProps extends HomeAnnouncementProps, AdAnnouncementsProps {
  announcementDate: string;
  announcementTag: string;
  isBookmarked: boolean;
}

export interface AdAnnouncementsProps {
  isAd?: boolean;
  subTitle?: string;
}

export interface AdAnnouncementProps {
  id: string;
  title: string;
  subtitle?: string;
  contents: string;
}
