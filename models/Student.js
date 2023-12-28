import { ObjectId, Schema } from "mongoose";
import mongoose from "mongoose";
import validator from "validator";

const StudentSchema = new Schema({
    id: { type: ObjectId },
    name: {
        type: String,
        required: true,
        //model validation
        validate: {
            validator: (name) => name.length > 3,
            message: "Name must be at least 3 characters",
        },
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: "Email is incorrect format",
        },
    },
    languages: {
        type: [String], //this is an array,
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female"],
            message: "{VALUE} is not supported",
        },
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (phoneNumber) =>
                phoneNumber.length > 5 && phoneNumber.length <= 50,
            message: "Phone number must be at least 5 characters, max: 50",
        },
    },
    address: {
        type: String,
        required: false
    },
});

export default mongoose.model("Student", StudentSchema);
