import { Router } from "express";
import userController from "./user.controller";
import zodValidation from "../../../middlewares/zodValidation";
import { updateUserZodValidator } from "./user.zodValidator";
import authCheck from "../../../middlewares/authCheck";
import ERoles from "../../../types/Enums/RoleEnums";
import headerToken from "../../../middlewares/headerToken";

const userRoute = Router();
userRoute.get("/", authCheck(ERoles.ADMIN), userController.getAllUser);
userRoute.get(
  "/my-profile",
  headerToken(),
  authCheck(ERoles.BUYER, ERoles.SELLER),
  userController.getMyProfile
);
userRoute.patch(
  "/my-profile",
  headerToken(),
  authCheck(ERoles.BUYER, ERoles.SELLER),
  userController.updateMyProfile
);

userRoute.get("/:id", authCheck(ERoles.ADMIN), userController.getAUser);
userRoute.patch(
  "/:id",
  authCheck(ERoles.ADMIN),
  zodValidation(updateUserZodValidator),
  userController.updateAUser
);
userRoute.delete("/:id", authCheck(ERoles.ADMIN), userController.deleteAUser);

export default userRoute;
