import express from "express";
import { login } from "../controllers/login-controller.js";
import userRouter from "./user-router.js";
import sudaderaRouter from "./sudadera-router.js";
const router = express.Router();

router.post("/login", login);

router.use("/users", userRouter);

router.use("/sudadera", sudaderaRouter);

export default router;
