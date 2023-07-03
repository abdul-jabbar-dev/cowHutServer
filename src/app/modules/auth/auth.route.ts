import express from "express";

import { AuthValidation } from "./auth.validation";
import zodValidation from "../../../middlewares/zodValidation";
import authController from "./auth.controller";
import authCheck from "../../../middlewares/authCheck";
import ERoles from "../../../types/Enums/RoleEnums";
const authRoutes = express.Router();

authRoutes.post(
  "/login",
  zodValidation(AuthValidation.loginZodSchema),
  authController.loginUser
);

authRoutes.post(
  "/refresh-token",
  zodValidation(AuthValidation.refreshTokenZodSchema),
  authCheck(ERoles.BUYER, ERoles.SELLER, ERoles.ADMIN),
  authController.refreshToken
);

export default authRoutes;
