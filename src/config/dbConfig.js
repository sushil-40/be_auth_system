import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("Provide Mongo_Url connection string!");
    }
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
