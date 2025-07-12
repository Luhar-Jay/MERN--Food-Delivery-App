import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connected"))
    .catch(() => {
      console.log("Connection failed");
    });
};
