import mongoose, { isValidObjectId } from "mongoose";
import COW from "../cow/cow.model";
import USER from "../user/user.model";
import TOrder from "./order.interface";
import ORDER from "./order.model";
import { JwtPayload } from "jsonwebtoken";
import ERoles from "../../../types/Enums/RoleEnums";

const createAOrderDB = async (cowId: string, buyerId: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const cow = await COW.findById(cowId).session(session);
    if (!cow) {
      throw new Error(cowId + " This cow does not exist!!");
    }
    if (cow.label === "sold out") {
      throw new Error("The product is already sold out!");
    }
    const buyer = await USER.findById(buyerId).session(session);
    if (!buyer) {
      throw new Error(buyerId + " this user does not exist!");
    }
    if (Number(buyer.budget) < 1) {
      throw new Error(
        `Insufficient balance! Your current balance is ${buyer.budget} taka`
      );
    }
    if (buyer.budget < cow.price) {
      const moreBalance = Number(cow.price) - Number(buyer.budget);
      throw new Error(
        `Insufficient balance! Please add ${moreBalance} taka to your account for the purchase to be completed. Your current balance is ${buyer.budget} taka`
      );
    }
    const seller = await USER.findById(cow.seller).session(session);
    if (!seller) {
      throw new Error("Internal server error");
    }
    // Buying process
    cow.label = "sold out";
    buyer.budget = Number(buyer.budget) - Number(cow.price);
    seller.income = Number(seller.income) + Number(cow.price);

    await cow.save({ session, validateBeforeSave: true });
    await buyer.save({ session, validateBeforeSave: true });
    await seller.save({ session, validateBeforeSave: true });

    const orderDetails: TOrder = {
      buyer: buyer._id,
      cow: cow._id,
      price: cow.price,
      seller: seller._id,
    };
    const confirmOrder = await ORDER.create([orderDetails], { session });
    if (!confirmOrder) {
      throw new Error("Internal server error! Order not approved");
    }

    await session.commitTransaction();

    return confirmOrder;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
const getAllOrderDB = async (user: JwtPayload) => {
  try {
    let result;
    if (user.role === ERoles.ADMIN) {
      result = await ORDER.find({})
        .lean()
        .populate("buyer", "-password")
        .populate("cow")
        .populate("seller", "-password");
    } else if (user.role === ERoles.BUYER) {
      result = await ORDER.find({ buyer: user.role }, { buyer: 0 })
        .lean()
        .populate("cow")
        .populate("seller", "-password");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
const getAOrderDB = async (order_id: string, authorizer: JwtPayload) => {
  try {
    let result;
    if (authorizer.role == ERoles.ADMIN) {
      result = await ORDER.findOne({ _id: order_id });
    } else {
      let roleFind;
      if (authorizer.role === ERoles.BUYER) {
        roleFind = {
          buyer: authorizer._id,
        };
      } else if (authorizer.role === ERoles.BUYER) {
        roleFind = {
          seller: authorizer._id,
        };
      }

      result = await ORDER.findOne(
        {
          _id: order_id,
          ...roleFind,
        },
        { cow: 1, buyer: 1 }
      );
    }
    if (!result) {
      throw new Error("Invalid order");
    }
    result = await (
      await result.populate("buyer")
    ).populate({
      path: "cow",
      populate: "seller",
    });

    if (result.buyer) {
      (result.buyer as any).password = undefined;
    }
    if (result && result.cow && (result.cow as any).seller) {
      (result.cow as any).seller.password = undefined;
    }
    return result;
  } catch (error) {
    throw error;
  }
};
const orderService = { createAOrderDB, getAllOrderDB, getAOrderDB };
export default orderService;
