import { print, OutputType } from "../helpers/print.js";
import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
    // print("login user in user repository", OutputType.INFORMATION);
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
        const isMatched = await bcrypt.compare(password, existingUser.password);

        if (isMatched === true) {
            // create token
            const token = jwt.sign({ data: existingUser }, process.env.JWT_SECRET, { expiresIn: '10 days' });

            return {
                ...existingUser.toObject(),
                password: "Not show",
                token
            };
        } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
        }
    } else {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD);
    }
};

const register = async ({ email, password, name, phoneNumber, address }) => {
    // validation already done
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
        throw new Exception(Exception.USER_EXISTING);
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
    );
    console.log({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
    });
    // insert to DB
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
    });

    return {
        ...newUser._doc,
        password: "Not show",
    };
    // print(`register user width name: ${name}, email: ${email}`, OutputType.INFORMATION);
};

export default {
    register,
    login,
};
