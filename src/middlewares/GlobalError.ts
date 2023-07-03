import { ErrorRequestHandler } from "express";
import TErrorResponse from "../types/Errors/TErrorResponse";
import zodErrorHandler from "../utils/handleErrors/zodErrorHandler";
import castErrorHandler from "../utils/handleErrors/castErrorHandler";
import ValidationErrorHandler from "../utils/handleErrors/validationErrorHandler";

const globalError: ErrorRequestHandler = (err, req, res, next) => {
  const error: TErrorResponse & { success: "False" } = {
    success: "False",
    message: "",
    errorMessages: [],
    stack: "",
    statusCode: 400,
  };
  if (typeof err === "string") {
    error.errorMessages = [{ message: err, path: "" }];
    error.message = err;
  } else if (err?.name === "ValidationError") {
    const { message, stack, errorMessages, statusCode } =
      ValidationErrorHandler(err);
    error.message = message;
    error.stack = stack;
    error.errorMessages = errorMessages;
    error.statusCode = statusCode;
  } else if (err?.name === "ZodError") {
    const { message, stack, errorMessages, statusCode } = zodErrorHandler(err);
    error.message = message;
    error.stack = stack;
    error.errorMessages = errorMessages;
    error.statusCode = statusCode;
  } else if (err?.name === "CastError") {
    const { message, stack, errorMessages, statusCode } = castErrorHandler(err);
    error.message = message;
    error.stack = stack;
    error.errorMessages = errorMessages;
    error.statusCode = statusCode;
  } else if (err instanceof Error) {
    error.message = err.message;
    error.errorMessages.push({ message: err.message, path: "" });
  }
  res.status(error.statusCode || 400).send(error);
};
export default globalError;
