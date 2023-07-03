import { RequestHandler } from "express";

const headerToken = (): RequestHandler => (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    next("Token require");
  }
  token = (token as string).split(" ")[1];
  res.cookie("refreshToken", token, { httpOnly: true });
  next();
};
export default headerToken;
