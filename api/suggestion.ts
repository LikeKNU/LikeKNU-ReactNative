import { useDeviceId } from '@/utils/device';
import http, { extractMessageFromResponse } from '@/utils/http';

export const sendSuggestion = async (deviceId: string, content: string) => {
  if (deviceId) {
    const response = await http.post<string, any>(`/api/suggestions`, { deviceId: deviceId, content: content });
    return extractMessageFromResponse(response);
  }
};
