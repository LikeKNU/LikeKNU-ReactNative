import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

interface AnnouncementViewProps {
  title: string;
  url?: string | null;
}

const WebViewPage = ({ url, title }: AnnouncementViewProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title={title} />
      {/*<View style={styles.progressBarContainer}>*/}
      {!isLoaded && (
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      )}
      {/*</View>*/}
      {
        url ? (
          <WebView
            source={{ uri: url }}
            onLoadProgress={({ nativeEvent }) => {
              setProgress(nativeEvent.progress);
              if (nativeEvent.progress === 1) {
                setIsLoaded(true);
              }
            }}
            allowsBackForwardNavigationGestures={true}
            onLoadStart={() => setIsLoaded(false)}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FontText fontWeight="500" style={styles.notFoundMessage}>
            404 NotFound
          </FontText>
        )
      }
    </PageLayout>
  );
};

export default WebViewPage;

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 2,
    backgroundColor: 'transparent'
  },
  progressBar: {
    height: 2,
    backgroundColor: colors.blue,
  },
  notFoundMessage: {
    textAlign: 'center',
    color: colors.red,
    fontSize: 16
  }
});
