import mongoose from "mongoose";
import TErrorResponse, {
  TErrorMessages,
} from "../../types/Errors/TErrorResponse";
import { StatusCodes } from "http-status-codes";

const castErrorHandler = (err: mongoose.Error.CastError): TErrorResponse => {
  let error = {
    errorMessages: [] as TErrorMessages[],
    message: err.name,
    stack: err.stack || undefined,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.message || err.path) {
    error.errorMessages.push({
      path: err.path,
      message: err.message,
    });
  }
  return error;
};

export default castErrorHandler;
