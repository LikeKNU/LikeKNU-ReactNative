import { useDeviceId } from '@/utils/device';
import http, { extractBodyFromResponse, extractMessageFromResponse } from '@/utils/http';
import useSWR from 'swr';

export type NotificationType = 'KEYWORD_MATCH';

export interface NotificationItem {
  notificationId: string;
  type: NotificationType;
  notificationTitle: string;
  notificationBody: string;
  notificationDate: string;
  notificationUrl: string;
  read: boolean;
}

interface TurnOnNotificationResponse {
  turnOn: boolean;
}

export const useNotificationStatus = () => {
  const { deviceId } = useDeviceId();

  const fetcher = async (uri: string, deviceId: string | null) => {
    if (!deviceId) return null;
    const response = await http.getWithParams<TurnOnNotificationResponse>(uri, { deviceId });
    return extractBodyFromResponse<TurnOnNotificationResponse>(response);
  };

  return useSWR(['/api/devices/notifications', deviceId], ([uri, deviceId]) => fetcher(uri, deviceId));
};

export const updateNotificationStatus = async (deviceId: string, notification: boolean) => {
  const response = await http.put<string, any>('/api/devices/notifications', { deviceId, notification });
  return extractMessageFromResponse(response);
};

export const registerExpoPushToken = async (deviceId: string, token: string) => {
  const response = await http.post<string, any>('/api/devices/token', { deviceId, token });
  return extractMessageFromResponse(response);
};

export const useNotifications = () => {
  const { deviceId } = useDeviceId();

  const fetcher = async (uri: string, deviceId: string | null) => {
    if (!deviceId) return [];
    const response = await http.get<NotificationItem[]>(`${uri}?deviceId=${deviceId}`);
    return extractBodyFromResponse<NotificationItem[]>(response) ?? [];
  };

  return useSWR(['/api/notifications', deviceId], ([uri, deviceId]) => fetcher(uri, deviceId));
};

export const markNotificationAsRead = async (deviceId: string, notificationId: string) => {
  const response = await http.putWithParams<string, undefined>(
    `/api/notifications/${notificationId}/read`,
    undefined,
    { deviceId }
  );
  return extractMessageFromResponse(response);
};

export const markAllNotificationsAsRead = async (deviceId: string) => {
  const response = await http.put<string, any>('/api/notifications/read-all', { deviceId });
  return extractMessageFromResponse(response);
};
