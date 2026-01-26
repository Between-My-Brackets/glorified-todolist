import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/blab");
        console.log("mongoose is connected");
    }
    catch(err){
        console.error("connection failed");
        process.exit(1);
    }
};