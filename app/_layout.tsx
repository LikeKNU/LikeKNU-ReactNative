import CampusContextProvider from '@/common/contexts/CampusContext';
import FavoriteContextProvider from '@/common/contexts/FavoriteContext';
import ThemeContextProvider, { useTheme } from '@/common/contexts/ThemeContext';
import colors from '@/constants/colors';
import Fonts from '@/constants/fonts';
import useInitializeDevice from '@/utils/device';
import analytics from '@react-native-firebase/analytics';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import * as Updates from 'expo-updates';
import React, { useCallback, useEffect } from 'react';
import { Alert, AppState } from 'react-native';
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
      await checkForUpdates();

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

export async function checkForUpdates() {
  if (__DEV__) {
    return;
  }

  const update = await Updates.checkForUpdateAsync();

  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    Alert.alert(
      '업데이트 완료 ⬆️',
      '앱을 재시작할게요!',
      [
        {
          text: '확인',
          onPress: async () => {
            await Updates.reloadAsync();
          }
        }
      ]
    );
  }
}

const Content = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  useInitializeDevice();

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
