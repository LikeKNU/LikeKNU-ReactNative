import BusTimetableView from '@/app/bus/timetable/components/BusTimetableView';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const BusTimetableDetails = () => {
  const { routeId } = useLocalSearchParams<{ routeId: string }>();

  return (
    <BusTimetableView routeId={routeId} />
  );
};

export default BusTimetableDetails;
