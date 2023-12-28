import * as dotenv from "dotenv";
dotenv.config(); // must have

import express from "express";
import checkToken from "./authentication/auth.js";
import connect from "./database/database.js";
import { userRouter, studentRouter } from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.send("response from root router 2");
});

// app.use(checkToken);
// parse json body to object
app.use(express.json());

// routers
app.use("/users", userRouter);
app.use("/students", studentRouter);

app.listen(PORT, async () => {
    await connect();
    console.log("Listening on port:", PORT);
});