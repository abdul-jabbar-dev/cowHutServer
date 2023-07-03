import { StatusCodes } from "http-status-codes";
import TErrorResponse, {
  TErrorMessages,
} from "../../types/Errors/TErrorResponse";

const zodErrorHandler = (err: Zod.ZodError): TErrorResponse => {
  let error = {
    errorMessages: [] as TErrorMessages[],
    message: err.name,
    stack: err.stack || undefined,
    statusCode: 400,
  };
  if (err.errors) {
    error.errorMessages = err.errors.map((singleP): TErrorMessages => {
      return { path: singleP.path.join("->"), message: singleP.message };
    });
  }
  return error;
};
export default zodErrorHandler;
