import CampusContextProvider from '@/common/contexts/CampusContext';
import FavoriteContextProvider from '@/common/contexts/FavoriteContext';
import ThemeContextProvider, { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import useInitializeDevice from '@/utils/device';
import { API_URL } from '@/utils/http';
import analytics from '@react-native-firebase/analytics';
import * as Application from 'expo-application';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import React, { useCallback, useEffect } from 'react';
import { Alert, AppState, Linking, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import mobileAds from 'react-native-google-mobile-ads';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStateStatus } from 'react-native/Libraries/AppState/AppState';
import { SWRConfig } from 'swr';

SplashScreen.preventAutoHideAsync();

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
  useInitializeDevice();

  const checkAppVersion = async () => {
    const response = await fetch(`${API_URL}/api/versions`);
    const version = await response.text();
    const currentVersion = Application.nativeApplicationVersion;

    if (version && currentVersion && version > currentVersion) {
      Alert.alert(
        '업데이트 ⬆️',
        '앱을 새로운 버전으로 업데이트 해주세요!',
        [
          {
            text: '나중에',
            style: 'destructive'
          },
          {
            text: '업데이트',
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/kr/app/id6499512208');
              } else {
                Linking.openURL('https://play.google.com/store/apps/details?id=ac.knu.likeknu&hl=ko');
              }
            }
          }
        ]
      );
    }
  };

  useEffect(() => {
    checkAppVersion().then(() => {
    });
  }, []);

  useEffect(() => {
    requestTrackingPermissionsAsync()
      .then(() => {
      });

    mobileAds()
      .initialize()
      .then(() => {
      });

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
