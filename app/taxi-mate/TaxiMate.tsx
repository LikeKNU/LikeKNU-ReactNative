import PageLayout from '@/common/components/PageLayout';
import colors from '@/constants/colors';
import { registerForPushNotificationsAsync } from '@/utils/pushNotifications';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AppState, BackHandler, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes';
import { WebViewMessageEvent } from 'react-native-webview/src/WebViewTypes';

interface TaxiMateProps {
  partyId?: string
}

const TaxiMate = ({ partyId }: TaxiMateProps) => {
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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && webViewRef.current) {
        webViewRef.current.reload();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

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
        break;
      }
      case 'chat': {
        if (partyId) {
          webViewRef.current?.injectJavaScript(`window.postMessage('${JSON.stringify({ partyId: partyId })}')`);
        }
        break;
      }
    }
  };

  return (
    <PageLayout edges={['top', 'bottom']} style={{ backgroundColor: colors.light.container }}>
      <WebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_TAXI_MATE_URL }}
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
