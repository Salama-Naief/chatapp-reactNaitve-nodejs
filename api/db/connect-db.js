import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
  // await mongoose.connect("mongodb://127.0.0.1:27017/app");
};
