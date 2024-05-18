import { useCampus } from '@/common/contexts/CampusContext';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import { useTheme } from '@/common/contexts/ThemeContext';
import { campusName } from '@/constants/campus';
import { UserThemeType } from '@/types/common';
import http from '@/utils/http';
import { getData, storeData } from '@/utils/storage';
import * as Application from 'expo-application';
import * as Device from 'expo-device';
import * as StoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export interface DeviceRegistrationProps {
  deviceId: string;
  platform: 'ios' | 'android' | 'macos' | 'windows' | 'web';
  modelName: string | null;
  osVersion: string | null;
  appVersion: string | null;
  campus: string;
  themeColor: UserThemeType;
  favoriteCafeteria: string | null | undefined;
}

const useInitializeDevice = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { deviceId } = useDeviceId();
  const { favoriteCafeteria } = useFavoriteCafeteria();
  const modelName = Device.modelName;
  const osVersion = Device.osVersion;
  const applicationVersion = Application.nativeApplicationVersion;
  const buildVersion = Application.nativeBuildVersion;

  useEffect(() => {
    const initializeDevice = async () => {
      if (campus) {
        try {
          if (!deviceId) {
            throw new Error('Device ID is null');
          }

          const storedDeviceId = await getData('deviceId');
          if (!storedDeviceId || storedDeviceId !== deviceId) {
            await storeData('deviceId', deviceId);
          }

          const launchCount = await getData('launchCount');
          if (!launchCount) {
            await storeData('launchCount', '0');
          }

          if (launchCount && parseInt(launchCount, 10) < 5) {
            if (launchCount === '4' && await StoreReview.hasAction()) {
              StoreReview.requestReview();
            }
            await storeData('launchCount', `${parseInt(launchCount, 10) + 1}`);
          }

          await http.post<any, DeviceRegistrationProps>('/api/devices', {
            deviceId: deviceId,
            platform: Platform.OS,
            modelName: modelName,
            osVersion: osVersion,
            appVersion: `${applicationVersion} (${buildVersion})`,
            themeColor: theme,
            campus: campusName[campus].value,
            favoriteCafeteria: favoriteCafeteria
          });
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeDevice();
  }, [theme, campus, favoriteCafeteria]);

  return { isLoading, error }
};

export default useInitializeDevice;

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceId = async () => {
      if (Platform.OS === 'ios') {
        const iosId = await Application.getIosIdForVendorAsync();
        setDeviceId(iosId);
      } else if (Platform.OS === 'android') {
        const androidId = Application.getAndroidId();
        setDeviceId(androidId);
      }
    };

    fetchDeviceId();
  }, []);

  return { deviceId };
};
