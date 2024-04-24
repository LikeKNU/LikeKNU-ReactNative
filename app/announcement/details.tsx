import WebViewPage from '@/common/WebViewPage';
import { useLocalSearchParams } from 'expo-router';

const AnnouncementDetailsPage = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

  return <WebViewPage title="공지사항" url={url} />
};

export default AnnouncementDetailsPage;
