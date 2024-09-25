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

export const calculateTimeRemaining = (arrivalTime: string): string => {
  const now = new Date();
  const [hours, minutes] = arrivalTime.split(':').map(Number);
  const arrival = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  if (arrival < now) {
    return '';
  }
  const diffInMinutes = Math.round((arrival.getTime() - now.getTime()) / 60000);
  if (diffInMinutes < 1) {
    return '곧 도착';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 후`;
  } else {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours}시간 ${minutes}분 후`;
  }
};
