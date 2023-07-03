export type TErrorMessages = {
  path: string;
  message: string;
};
type TErrorResponse = {
  message: string;
  errorMessages: TErrorMessages[];
  statusCode?: number;
  stack?: string;
};
export default TErrorResponse