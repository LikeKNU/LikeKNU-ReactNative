import AnnouncementView from '@/app/announcement/components/AnnouncementView';
import { useLocalSearchParams } from 'expo-router';

const AnnouncementDetailsPage = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

  return <AnnouncementView url={url ?? ''} />
};

export default AnnouncementDetailsPage;
