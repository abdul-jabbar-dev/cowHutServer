import { Error } from "mongoose";
import { TErrorMessages } from "../../types/Errors/TErrorResponse";
import { StatusCodes } from "http-status-codes";

const ValidationErrorHandler = (err: Error.ValidationError) => {
  let error = {
    errorMessages: [] as TErrorMessages[],
    message: err.name,
    stack: err.stack || undefined,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.errors) {
    error.errorMessages = Object.keys(err.errors).map((p): TErrorMessages => {
      return { path: p, message: err.errors[p].message };
    });
  }
  return error;
};
export default ValidationErrorHandler;
