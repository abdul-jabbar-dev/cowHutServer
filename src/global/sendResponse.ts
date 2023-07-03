import { Response } from "express";
const sendResponse = <T>(
  res: Response,
  body: Partial<TResponse<T>> & { message: string },
  meta?: {
    page: number;
    limit: number;
    total: number;
  }
): void => {
  const response: TResponse<T> = {
    message: body.message,
    statusCode: body.statusCode || 200,
    success: body.success || true,
    data: body.data || undefined,
    meta: meta || undefined,
  };
  res.send(response);
};
export default sendResponse;
