import PageLayout from '@/common/components/PageLayout';
import colors from '@/constants/colors';
import { TaxiMatePostMessageProps } from '@/types/taxiMate';
import { registerForPushNotificationsAsync } from '@/utils/pushNotifications';
import * as Location from 'expo-location';
import { usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
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
    Location.requestForegroundPermissionsAsync()
      .then(() => {
      });
  }, []);

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
        router.replace('/');
        break;
      }
      case 'push_notification': {
        registerForPushNotificationsAsync()
          .then(token => {
            const pushNotificationToken: TaxiMatePostMessageProps = {
              type: 'PUSH_NOTIFICATION',
              data: {
                token: token
              }
            };
            webViewRef.current?.injectJavaScript(`window.postMessage('${JSON.stringify(pushNotificationToken)}')`);
          });
        break;
      }
      case 'chat': {
        if (partyId) {
          const chatTouchMessage: TaxiMatePostMessageProps = {
            type: 'CHAT',
            data: {
              partyId: partyId
            }
          };
          webViewRef.current?.injectJavaScript(`window.postMessage('${JSON.stringify(chatTouchMessage)}')`);
        }
        break;
      }
    }
  };

  return (
    <PageLayout edges={['top', 'bottom']} style={{ backgroundColor: colors.light.container }}>
      <StatusBar style={'dark'} />
      <WebView
        ref={webViewRef}
        source={{ uri: process.env.EXPO_PUBLIC_TAXI_MATE_URL as string }}
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
