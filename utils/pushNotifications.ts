import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Linking, Platform } from 'react-native';

// 포그라운드 푸시 표시 정책: data.type 별로 분기 가능. 기본은 모두 표시.
const SILENT_TYPES = new Set<string>([]);

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const data = notification.request.content.data as { type?: string } | undefined;
    const silent = data?.type ? SILENT_TYPES.has(data.type) : false;
    return {
      shouldShowBanner: !silent,
      shouldShowList: !silent,
      shouldPlaySound: !silent,
      shouldSetBadge: false
    };
  }
});

export const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX
    }).then(() => {
    });
  }

  return await getExpoPushToken();
};

export const getExpoPushToken = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('푸시 알림이 꺼져있어요!', '설정 앱에서 푸시 알림 권한을 설정해 주세요.', [
        {
          text: '취소',
          style: 'cancel'
        },
        {
          text: '설정',
          onPress: () => {
            if (Platform.OS === 'ios') {
              Linking.openURL('app-settings:');
            } else {
              Linking.openSettings();
            }
          },
          style: 'default'
        }
      ]);
      return;
    }

    const projectId = Constants.expoConfig?.extra?.eas.projectId ?? Constants.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }

    try {
      const expoPushToken = await Notifications.getExpoPushTokenAsync({ projectId: projectId });
      return expoPushToken.data;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
};

const handleRegistrationError = (errorMessage: string) => {
  alert(errorMessage);
  throw new Error(errorMessage);
};
