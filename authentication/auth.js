import jwt from "jsonwebtoken";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

export default function checkToken(req, res, next) {
    // bypass login, register
    if (["/users/login", "/users/register"].includes(req.url)) {
        next();
        return;
    }

    const token = req.headers?.authorization?.split(" ")[1];
    try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
        const isExpired = Date.now() >= jwtObject.exp * 1000;

        if (isExpired) {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Token is expired"
            });
            res.end();
        } else {
            next();
        }
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.message
        });
    }
}