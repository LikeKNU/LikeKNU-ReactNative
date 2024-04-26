import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

interface AnnouncementViewProps {
  title: string;
  url?: string | null;
}

const WebViewPage = ({ url, title }: AnnouncementViewProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const webViewRef = useRef<WebView>(null);

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const nativeEventSubscription =
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);

      return () => nativeEventSubscription.remove();
    }
  }, []);

  return (
    <PageLayout edges={['top']}>
      <BackHeader title={title} />
      {!isLoaded && (
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      )}
      {
        url ? (
          <WebView
            ref={webViewRef}
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
            setDisplayZoomControls={true}
            setBuiltInZoomControls={true}
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
