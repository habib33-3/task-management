/* eslint-disable no-console */
import mongoose from "mongoose";
import env from "../config/env";

const DB_NAME = "task-management";

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${env.dbUrl}/${DB_NAME}`
        );

        console.info(
            `\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`
        );
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default connectToDb;
