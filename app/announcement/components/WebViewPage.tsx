import BookmarkItem from '@/app/announcement/components/BookmarkItem';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

interface AnnouncementViewProps {
  id: string;
  title: string;
  url?: string | null;
  isBookmarked: boolean;
}

const WebViewPage = ({ id, url, title, isBookmarked }: AnnouncementViewProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [navigationState, setNavigationState] = useState<WebViewNativeEvent>();
  const webViewRef = useRef<WebView>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onAndroidBackPress = () => {
      if (!navigationState?.canGoBack) {
        router.back();
        return true;
      }

      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    if (Platform.OS === 'android') {
      const nativeEventSubscription =
        BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);

      return () => nativeEventSubscription.remove();
    }
  }, [navigationState?.canGoBack, pathname]);

  return (
    <PageLayout edges={['top']}>
      <BackHeader
        title={title}
        button={<BookmarkItem announcementId={id} isBookmarked={isBookmarked} />}
      />
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
            onNavigationStateChange={setNavigationState}
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
