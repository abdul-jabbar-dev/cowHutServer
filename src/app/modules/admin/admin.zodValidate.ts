import z, { object } from "zod";

export const createAdminZodValidator = z.object({
  body: z.object({
    phoneNumber: z.string(),
    role: z.enum(["admin"]),
    password: z.string(),
    name: object({
      firstName: z.string(),
      lastName: z.string(),
    }),
    address: z.string(),
  }),
});

export const loginAdminZodValidator = z.object({
  body: z.object({
    phoneNumber: z.string(), 
    password: z.string(),
  }),
});
