import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

mongoose.set("strictQuery", true);
async function connect() {
    try {
        // const connection = await mongoose.connect(process.env.MONGO_URI);
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS
        });
        print("Connect mongoose successfully", OutputType.SUCCESS);
        return connection;
    } catch (error) {
        const { code } = error;
        if (error.code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
        }
        if (code == "ENOTFOUND") {
            throw new Exception(Exception.WRONG_CONNECTION_STRING);
        }

        throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
    }
}

export default connect;
