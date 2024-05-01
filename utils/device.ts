import { useCampus } from '@/common/contexts/CampusContext';
import { useFavoriteCafeteria } from '@/common/contexts/FavoriteContext';
import { ThemeType, useTheme } from '@/common/contexts/ThemeContext';
import { campusName } from '@/constants/campus';
import http from '@/utils/http';
import { getData, storeData } from '@/utils/storage';
import * as Application from 'expo-application';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export interface DeviceRegistrationProps {
  deviceId: string;
  // platform: 'ios' | 'android' | 'macos' | 'windows' | 'web';
  userAgent: 'ios' | 'android' | 'macos' | 'windows' | 'web';
  campus: string;
  themeColor: ThemeType;
  favoriteCafeteria: string | null | undefined;
}

const useInitializeDevice = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const { theme } = useTheme();
  const { campus } = useCampus();
  const { favoriteCafeteria } = useFavoriteCafeteria();

  useEffect(() => {
    const initializeDevice = async () => {
      if (campus) {
        try {
          let deviceUniqueId: string | null = null;

          if (Platform.OS === 'ios') {
            deviceUniqueId = await Application.getIosIdForVendorAsync();
          } else if (Platform.OS === 'android') {
            deviceUniqueId = Application.getAndroidId();
          }

          if (!deviceUniqueId) {
            throw new Error('Device ID is null');
          }

          const storedDeviceId = await getData('deviceId');
          if (!storedDeviceId || storedDeviceId !== deviceUniqueId) {
            await storeData('deviceId', deviceUniqueId);
          }
          await http.post<any, DeviceRegistrationProps>('/api/devices', {
            deviceId: deviceUniqueId,
            // platform: Platform.OS,
            userAgent: Platform.OS,
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
