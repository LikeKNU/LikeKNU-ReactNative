import PageLayout from '@/common/components/PageLayout';
import colors from '@/constants/colors';
import { registerForPushNotificationsAsync } from '@/utils/pushNotifications';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';
import { WebViewMessageEvent } from 'react-native-webview/src/WebViewTypes';

const TaxiMate = () => {
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

  const handleMessage = (event: WebViewMessageEvent) => {
    const { data } = event.nativeEvent;
    switch (data) {
      case 'like_knu': {
        router.back();
        break;
      }
      case 'push_notification': {
        registerForPushNotificationsAsync()
          .then(token => {
            webViewRef.current?.injectJavaScript(`window.postMessage('${token}')`);
          });
      }
    }
  }

  return (
    <PageLayout edges={['top', 'bottom']} style={{ backgroundColor: colors.light.container }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://taxi-mate.like-knu.com' }}
        onNavigationStateChange={setNavigationState}
        allowsBackForwardNavigationGestures={true}
        javaScriptEnabled={true}
        geolocationEnabled={true}
        webviewDebuggingEnabled={__DEV__}
        bounces={false}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
      />
    </PageLayout>
  );
};

export default TaxiMate;
