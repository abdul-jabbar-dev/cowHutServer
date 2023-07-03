import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const bootsrtap = async () => {
  try {
    mongoose.connect(config.MONGO_URL ,{
  serverSelectionTimeoutMS: 60000
}).then(() => {
      console.log("database connect");
      app.listen(config.PORT, () => {
        console.log("Server is listening");
      });
    });
  } catch (error) {
    console.log("Database connection refuse :", error);
  }
};
bootsrtap();
