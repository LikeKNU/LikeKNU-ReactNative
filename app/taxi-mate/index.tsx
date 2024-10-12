import TaxiMate from '@/app/taxi-mate/TaxiMate';
import * as Notifications from 'expo-notifications';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

const TaxiMatePage = () => {
  const { partyId } = useLocalSearchParams<{ partyId: string }>();

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

  return <TaxiMate partyId={partyId} />
};

export default TaxiMatePage;
