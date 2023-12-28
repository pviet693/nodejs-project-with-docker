import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/index.js";

const router = express.Router();

router.get("/:id", userController.getDetailsUser);

router.post(
    "/login",
    body("password").isLength({ min: 5 }),
    body("email").isEmail(),
    userController.login
);

router.post("/register", userController.register);

export default router;
