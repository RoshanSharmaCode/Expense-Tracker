import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8"]);

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });

  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB;
