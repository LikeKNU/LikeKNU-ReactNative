import CloseButton from '@/common/components/CloseButton';
import CloseHeader from '@/common/components/CloseHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

const RestaurantMap = () => {
  const { theme } = useTheme();
  const [navigationState, setNavigationState] = useState<WebViewNativeEvent>();
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    setWebViewUrl('https://knu-matzip.vercel.app/');
  }, []);

  useEffect(() => {
    const onAndroidBackPress = () => {
      if (!navigationState?.canGoBack || isHome) {
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
    setIsHome(event.url === webViewUrl);

    setIsHome(event.url.split('?')[0] === 'https://knu-matzip.vercel.app/');
  };

  return (
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <CloseHeader
        button={<CloseButton />}
      />
      {!isLoaded &&
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: colors[theme].blue }]} />
      }
      {webViewUrl && <WebView
        ref={webViewRef}
        source={{ uri: webViewUrl! }}
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
        containerStyle={{ paddingBottom: bottom <= 10 ? bottom : bottom - 10 }}
      />
      }
    </PageLayout>
  );
};

export default RestaurantMap;

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
