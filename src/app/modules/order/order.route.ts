import { Router } from "express";
import orderController from "./order.controller";
import zodValidation from "../../../middlewares/zodValidation";
import { createOrderZodValidator } from "./order.zodValidator";
import ERoles from "../../../types/Enums/RoleEnums";
import authCheck from "../../../middlewares/authCheck";
import authSpecific from "../../../middlewares/authSpecific";

const ordersRoute = Router();
ordersRoute.post(
  "/",
  authCheck(ERoles.BUYER),
  zodValidation(createOrderZodValidator),
  orderController.createAOrder
);

ordersRoute.get(
  "/",
  authCheck(ERoles.ADMIN, ERoles.BUYER, ERoles.SELLER), 
  orderController.getAllOrder
);

ordersRoute.get(
  "/:id",
  authCheck(ERoles.BUYER, ERoles.SELLER, ERoles.ADMIN),
  orderController.getAOrder
);

export default ordersRoute;
