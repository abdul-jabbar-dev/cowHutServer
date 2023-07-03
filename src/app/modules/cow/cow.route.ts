import { Router } from "express";
import cowController from "./cow.controller";
import zodValidation from "../../../middlewares/zodValidation";
import {
  createCowZOdValidator,
  updateCowZOdValidator,
} from "./cow.zodValidator";
import authCheck from "../../../middlewares/authCheck";
import ERoles from "../../../types/Enums/RoleEnums";

const cowRoute = Router();

cowRoute.get(
  "/",
  authCheck(ERoles.SELLER, ERoles.SELLER, ERoles.ADMIN),
  cowController.getAllCow
);

cowRoute.post(
  "/",
  authCheck(ERoles.SELLER),
  zodValidation(createCowZOdValidator),
  cowController.createAllCow
);

cowRoute.get(
  "/:id",
  authCheck(ERoles.SELLER, ERoles.SELLER, ERoles.ADMIN),
  cowController.getACow
);

cowRoute.delete("/:id", authCheck(ERoles.SELLER), cowController.deleteACow);

cowRoute.patch(
  "/:id",
  authCheck(ERoles.SELLER),
  zodValidation(updateCowZOdValidator),
  cowController.updateACow
);

export default cowRoute;
