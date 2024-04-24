import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

interface AnnouncementViewProps {
  title: string;
  url?: string | null;
}

const WebViewPage = ({ url, title }: AnnouncementViewProps) => {
  return (
    <PageLayout edges={['top']}>
      <BackHeader title={title} />
      {
        url ? (
          <WebView
            style={styles.container}
            source={{ uri: url }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FontText fontWeight="500" style={{ textAlign: 'center', color: colors.red, fontSize: 16 }}>
            404 NotFound
          </FontText>
        )
      }
    </PageLayout>
  );
};

export default WebViewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
