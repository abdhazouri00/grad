import express from "express";
import {
  loginUser,
  registerUser,
  getUserInfo,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/:id", getUserInfo);

export default userRouter;
