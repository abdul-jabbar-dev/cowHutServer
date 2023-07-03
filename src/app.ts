import express, { Application } from "express";
import cors from "cors";
import userRoute from "./app/modules/user/user.route";
import userController from "./app/modules/user/user.controller";
import globalError from "./middlewares/GlobalError";
import zodValidation from "./middlewares/zodValidation";
import { createUserZodValidator } from "./app/modules/user/user.zodValidator";
import cowRoute from "./app/modules/cow/cow.route";
import ordersRoute from "./app/modules/order/order.route";
import adminRoute from "./app/modules/admin/admin.route";
import authRoutes   from "./app/modules/auth/auth.route";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/admins", adminRoute);
app.use("/api/v1/cows", cowRoute);
app.use("/api/v1/orders", ordersRoute);
app.use("/api/v1/auth", authRoutes);

app.post(
  "/api/v1/auth/signup",
  zodValidation(createUserZodValidator),
  userController.createUser
);

app.get("/", (req, res) => {
  res.send("home");
});
app.use(globalError);
export default app;
