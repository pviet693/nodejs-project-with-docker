import { validationResult } from "express-validator";
import { EventEmitter } from "node:events";
import { userRepository } from "../repositories/index.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const myEvent = new EventEmitter();

myEvent.on("event.register.user", (params) => {
    console.log("They talked about", JSON.stringify(params));
});

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const existingUser = await userRepository.login({ email, password });
        res.status(HttpStatusCode.OK).json({
            message: "User login successfully",
            data: existingUser
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        });
    }
};

const register = async (req, res) => {
    const {
        email,
        password,
        name,
        phoneNumber,
        address
    } = req.body;

    try {
        const user = await userRepository.register({
            email,
            password,
            name,
            phoneNumber,
            address
        });

        myEvent.emit("event.register.user", req.body);
        res.status(HttpStatusCode.INSERT_OK).json({
            message: "User register successfully",
            data: user
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        });
    }
};

const getDetailsUser = async (req, res) => {
    res.send("GET user details");
};

export default {
    login,
    register,
    getDetailsUser
}
