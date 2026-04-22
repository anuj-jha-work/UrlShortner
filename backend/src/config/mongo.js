import mongoose from "mongoose";
import { mongoUri } from "./constants.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
    }
};
export const db = mongoose.connection;
