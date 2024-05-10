export interface APIResponse<T> {
  timeStamp: string;
  message: string;
  data: {
    body: T;
  };
}
