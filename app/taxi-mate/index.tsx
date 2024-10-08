import TaxiMate from '@/app/taxi-mate/TaxiMate';
import TaxiMatePreview from '@/app/taxi-mate/TaxiMatePreview';
import * as Notifications from 'expo-notifications';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

const TaxiMatePage = () => {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();

  useEffect(() => {
    Notifications.dismissAllNotificationsAsync()
      .then(() => {
      });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      })
    });

    return () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        })
      });
    };
  }, []);

  return <TaxiMatePreview />
};

export default TaxiMatePage;
