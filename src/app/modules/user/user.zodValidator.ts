import z from "zod";
export const createUserZodValidator = z.object({
  body: z.object({
    phoneNumber: z.string(),
    role: z.enum(["seller", "buyer"]),
    password: z.union([z.string(), z.number()]),
    name: z.object({
      firstName: z.string().trim(),
      lastName: z.string().trim(),
    }),
    address: z.string().trim(),
    budget: z.number().min(0, "Negative budget not allowed"),
    income: z.number().min(0, "Negative income not allowed"),
  }),
});
export const updateUserZodValidator = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    password: z.union([z.string(), z.number()]).optional(),
    name: z.object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
    }),
    address: z.string().trim().optional(),
  }),
});
