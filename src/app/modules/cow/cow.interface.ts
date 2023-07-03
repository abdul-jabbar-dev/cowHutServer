import { Schema } from "mongoose";
import { TCowCategory, TCowLabel, TCowLocation } from "./cow.constant";
export type TCow = {
  name: string;
  age: Number;
  price: Number;
  location: TCowLocation;
  breed: string;
  weight: Number;
  label: TCowLabel;
  category: TCowCategory;
  seller: Schema.Types.ObjectId;
};
