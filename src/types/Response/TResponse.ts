type TResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data?: T | undefined;
  meta?: { page: number; limit: number; total: number };
};
