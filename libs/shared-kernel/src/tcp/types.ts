export type ServiceMessage<T = any> = {
  correlationId: string;
  payload: T;
  timestamp: number;
};

export type ServiceResponse<T = any> = {
  correlationId: string;
  data: T;
  success: boolean;
  error?: string;
};
