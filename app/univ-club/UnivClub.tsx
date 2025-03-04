import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

const UnivClub = () => {
  const { theme } = useTheme();
  const [navigationState, setNavigationState] = useState<WebViewNativeEvent>();
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
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

  const handleNavigationStateChange = (event: WebViewNativeEvent) => {
    setNavigationState(event);
    setIsHome(event.url === 'https://univ-club.vercel.app/');
  };

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <BackHeader title="동아리" onPress={() => {
        navigationState?.canGoBack ? webViewRef.current?.goBack() : router.back();
      }} />
      {!isLoaded &&
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: colors[theme].blue }]} />
      }
      {/*{isHome &&
        <View style={styles.noticeContainer}>
          <FontText fontWeight="600" style={{ color: colors[theme].blue }}>앞으로 동아리 정보가 계속 추가될 예정이에요</FontText>
          <FontText fontWeight="500" style={styles.subNotice}>동아리 연합회나 동아리장이 직접 등록해요</FontText>
        </View>
      }*/}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://univ-club.vercel.app/' }}
        onNavigationStateChange={handleNavigationStateChange}
        allowsBackForwardNavigationGestures={true}
        javaScriptEnabled={true}
        webviewDebuggingEnabled={__DEV__}
        bounces={false}
        sharedCookiesEnabled={true}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress);
          if (nativeEvent.progress === 1) {
            setIsLoaded(true);
          }
        }}
        onLoadStart={() => setIsLoaded(false)}
      />
    </PageLayout>
  );
};

export default UnivClub;

const styles = StyleSheet.create({
  progressBar: {
    height: 2
  },
  noticeContainer: {
    backgroundColor: colors.light.gray300,
    alignItems: 'center',
    paddingVertical: 8
  },
  subNotice: {
    color: colors.light.gray100
  }
});
