import BackHeader from '@/common/components/BackHeader';
import PageLayout from '@/common/components/PageLayout';
import { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';

const Library = () => {
  const { theme } = useTheme();
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
    <PageLayout edges={['top']} style={{ backgroundColor: colors[theme].container }}>
      <BackHeader title="도서관" onPress={() => {
        navigationState?.url == 'https://library.kongju.ac.kr/#/' ? router.back() : webViewRef.current?.goBack();
      }} />
      {!isLoaded && (
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: colors[theme].blue }]} />
      )}
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://library.kongju.ac.kr/#/' }}
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

export default Library;

const styles = StyleSheet.create({
  progressBar: {
    height: 2
  }
});
