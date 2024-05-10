import { OperatingStatus } from '@/constants/meal';
import { OperatingType } from '@/types/mealTypes';

export const getCurrentDate = () => {
  return new Date().toISOString()
    .split('T')[0]
    .replace(/-/g, '.');
};

export const determineTimeStatus = (timeRange: string): OperatingType => {
  const currentDate = new Date();
  const [startTime, endTime] = timeRange.split(' ~ ');

  const start = new Date(currentDate);
  const end = new Date(currentDate);

  start.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]), 0, 0);
  end.setHours(parseInt(endTime.split(':')[0]), parseInt(endTime.split(':')[1]), 0, 0);

  if (currentDate < start) {
    return OperatingStatus.PREPARE as OperatingType;
  } else if (currentDate > end) {
    return OperatingStatus.END as OperatingType;
  } else {
    return OperatingStatus.OPERATE as OperatingType;
  }
};
