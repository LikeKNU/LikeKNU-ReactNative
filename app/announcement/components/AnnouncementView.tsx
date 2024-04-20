import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/components/ThemeContext';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface AnnouncementViewProps {
  url: string;
}

const AnnouncementView = ({ url }: AnnouncementViewProps) => {
  const { theme } = useTheme();

  return (
    <PageLayout edges={['top']}>
      <BackHeader title="공지사항" />
      <WebView
        style={styles.container}
        source={{ uri: url }}
        showsVerticalScrollIndicator={false}
      />
    </PageLayout>
  );
};

export default AnnouncementView;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
