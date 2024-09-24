import TaxiMate from '@/app/taxi-mate/TaxiMate';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

const TaxiMatePage = () => {
  useEffect(() => {
    Notifications.dismissAllNotificationsAsync()
      .then(() => {
      });
  }, []);

  return <TaxiMate />
};

export default TaxiMatePage;
