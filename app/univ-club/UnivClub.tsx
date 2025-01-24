import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

const UnivClub = () => {
  const [navigationState, setNavigationState] = useState<WebViewNativeEvent>();
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
    <PageLayout edges={['top']} style={{ backgroundColor: colors.light.container }}>
      <StatusBar style={'dark'} />
      <BackHeader title="동아리" onPress={() => {
        navigationState?.canGoBack ? webViewRef.current?.goBack() : router.back();
      }} />
      {!isLoaded && (
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_UNIV_CLUB_URL as string }}
        onNavigationStateChange={setNavigationState}
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
    height: 2,
    backgroundColor: colors.blue,
  }
});
