import z from "zod";

export const createOrderZodValidator = z.object({
  body: z.object({
    buyer: z.string().nonempty("Buyer id is required "),
    cow: z.string().nonempty("Cow id is required "),
  }),
});
