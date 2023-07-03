import { RequestHandler } from "express";
import orderService from "./order.service";
import sendResponse from "../../../global/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createAOrder: RequestHandler = async (req, res, next) => {
  try {
    const cowId = req.body.cow;
    const buyerId = req.body.buyer;
    const result = await orderService.createAOrderDB(cowId, buyerId);
    console.log(result);
    sendResponse(res, {
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllOrder: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user
    const result = await orderService.getAllOrderDB(user as JwtPayload);
    sendResponse(res, {
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAOrder: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user: JwtPayload | null = req.user;
    const result = await orderService.getAOrderDB(id, user as JwtPayload);
    sendResponse(res, {
      message: "Order information retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const orderController = { createAOrder, getAllOrder,  getAOrder };
export default orderController;
