import mongoose from "mongoose";

export let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is alreay connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MONGODB Connected");
  } catch (error) {
    console.log(error);
  }
};
