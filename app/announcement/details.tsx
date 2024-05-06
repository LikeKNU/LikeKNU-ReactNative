import WebViewPage from '@/app/announcement/components/WebViewPage';
import { useLocalSearchParams } from 'expo-router';

const AnnouncementDetailsPage = () => {
  const { url, id, isBookmark } = useLocalSearchParams<{ url: string; id: string; isBookmark: string; }>();
  const isBookmarked = isBookmark === 'true';

  return <WebViewPage title="공지사항" url={url} id={id!} isBookmarked={isBookmarked} />
};

export default AnnouncementDetailsPage;
