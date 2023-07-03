import { RequestHandler } from "express"; 
import ORDER from "../app/modules/order/order.model";
import sendResponse from "../global/sendResponse";

const authSpecific = (): RequestHandler => async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw "invalid user";
  }
  if (user && user.role === "admin") {
    next();
  } else {
    const seller = await ORDER.find({ [user.role]: user._id });
    sendResponse(res, {
      message: "Order retrieved successfully",
      data: seller,
    });
  }
};
export default authSpecific;
