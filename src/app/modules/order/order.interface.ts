import { Types } from "mongoose";

type TOrder = {
  buyer: Types.ObjectId;
  cow: Types.ObjectId;
  price: Number;
  seller: Types.ObjectId;
};
export default TOrder;
