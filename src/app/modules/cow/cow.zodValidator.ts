import z from "zod";
import { CowCategory, CowLabel, CowLocation } from "./cow.constant";

export const createCowZOdValidator = z.object({
  body: z.object({
    name: z.string(),
    age: z.number().min(0, "Age must be positive number"),
    price: z.number().min(0, "Price must be positive number"),
    location: z.enum(CowLocation as [string, ...string[]]),
    breed: z.string(),
    weight: z.number().min(0, "Weight must be positive number in kilograms"),
    label: z.string().refine((value) => value === "for sale", {
      message: "Label must be 'for sale'",
    }),
    category: z.enum(CowCategory as [string, ...string[]]),
    seller: z.string(),
  }),
});

export const updateCowZOdValidator = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().min(0, "Age must be positive number").optional(),
    price: z.number().min(0, "Price must be positive number").optional(),
    location: z.enum(CowLocation as [string, ...string[]]).optional(),
    breed: z.string().optional(),
    weight: z
      .number()
      .min(0, "Weight must be positive number in kilograms")
      .optional(),
    label: z.enum(CowLabel as [string, ...string[]]).optional(),
    category: z.enum(CowCategory as [string, ...string[]]).optional(),
  }),
});
