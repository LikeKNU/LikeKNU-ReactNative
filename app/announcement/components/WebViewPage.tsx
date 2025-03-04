import BookmarkItem from '@/app/announcement/components/BookmarkItem';
import ShareIcon from '@/assets/icons/arrow-up-from-bracket.svg';
import AnimatedPressable from '@/common/components/AnimatedPressable';
import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import FontText from '@/common/text/FontText';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, Share, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

interface AnnouncementViewProps {
  id: string;
  title: string;
  url?: string | null;
  isBookmarked: boolean;
}

const WebViewPage = ({ id, url, title, isBookmarked }: AnnouncementViewProps) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [navigationState, setNavigationState] = useState<WebViewNativeEvent>();
  const webViewRef = useRef<WebView>(null);
  const router = useRouter();
  const pathname = usePathname();

  const sharing = () => {
    Share.share({ title: title, url: url! })
      .then(() => {
      });
  };

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
        button={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AnimatedPressable animatedViewStyle={{ marginRight: 8, borderRadius: 8 }} style={{ padding: 4 }}
                               onPress={sharing}>
              <ShareIcon width={26} height={26} fill={colors[theme].gray200} />
            </AnimatedPressable>
            <BookmarkItem announcementId={id} isBookmarked={isBookmarked} />
          </View>
        }
      />
      {!isLoaded && (
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: colors[theme].blue }]} />
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
          <FontText fontWeight="500" style={[styles.notFoundMessage, { color: colors[theme].red }]}>
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
    height: 2
  },
  notFoundMessage: {
    textAlign: 'center',
    fontSize: 16
  }
});
