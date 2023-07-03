import { Router } from "express";
import zodValidation from "../../../middlewares/zodValidation";
import { createAdminZodValidator, loginAdminZodValidator } from "./admin.zodValidate";
import adminController from "./admin.controller";

const adminRoute = Router();
adminRoute.post("/create-admin", zodValidation(createAdminZodValidator),adminController.createAdmin);
adminRoute.post("/login", zodValidation(loginAdminZodValidator),adminController.loginAdmin);
export default adminRoute;
