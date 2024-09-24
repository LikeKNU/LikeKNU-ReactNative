import CampusContextProvider from '@/common/contexts/CampusContext';
import FavoriteContextProvider from '@/common/contexts/FavoriteContext';
import ThemeContextProvider, { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import useInitializeDevice from '@/utils/device';
import { registerForPushNotificationsAsync } from '@/utils/pushNotifications';
import analytics from '@react-native-firebase/analytics';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateStatus } from 'react-native/Libraries/AppState/AppState';
import { SWRConfig } from 'swr';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  })
});

const AppLayout = () => {
  const [fontsLoaded, fontError] = useFonts(Fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1000);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleInitFocus = (callback: VoidFunction) => {
    let currentState = AppState.currentState;

    const onAppStateChange = (nextState: AppStateStatus) => {
      if (currentState.match(/inactive|background/) && nextState === 'active') {
        callback();
      }
      currentState = nextState;
    };

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => {
      subscription.remove();
    };
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <SWRConfig value={{
          provider: () => new Map(),
          isVisible: () => true,
          initFocus: (callback) => handleInitFocus(callback)
        }}>
          <RootSiblingParent>
            <ThemeContextProvider>
              <CampusContextProvider>
                <FavoriteContextProvider>
                  <Content />
                </FavoriteContextProvider>
              </CampusContextProvider>
            </ThemeContextProvider>
          </RootSiblingParent>
        </SWRConfig>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppLayout;

const Content = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useInitializeDevice();

  useEffect(() => {
    requestTrackingPermissionsAsync()
      .then(() => {
      });

    mobileAds()
      .initialize()
      .then(() => {
      });

    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      console.log('expoPushToken: ' + expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    analytics().logScreenView({
      screen_name: pathname,
      screen_class: pathname
    }).then(() => {
    });
  }, [pathname]);

  return (
    <Stack screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors[theme][pathname === '/' ? 'background' : 'container'] }
    }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};
