import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
    id: { type: ObjectId },
    name: {
        type: String,
        required: true,
        validation: {
            validator: (value) => value.length > 3,
            message: "Username must be at least 3 characters"
        }
    },
    email: {
        type: String,
        required: true,
        validation: {
            validator: (value) => validator.isEmail(value),
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

export default mongoose.model("User", userSchema);
