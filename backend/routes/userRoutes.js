import express from "express";
import {
  loginUser,
  registerUser,
  getUserInfo,
  saveChat,
  updateChat,
  LoadChats,
  updateUserCredit,
  updateBillingEmail,
  updateCountry,
  updateCity,
  updatePhoneNumber,
  updateCompany,
  updatePlan,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/:id", getUserInfo);

userRouter.post("/saveChat", saveChat);

userRouter.put("/updateChat", updateChat);

userRouter.get("/loadChats/:id", LoadChats);

userRouter.put("/updateCredit", updateUserCredit);

userRouter.put("/updateBillingEmail", updateBillingEmail);

userRouter.put("/updateCountry", updateCountry);

userRouter.put("/updateCity", updateCity);

userRouter.put("/updatePhoneNumber", updatePhoneNumber);

userRouter.put("/updateCompany", updateCompany);

userRouter.put("/updatePlan", updatePlan);


export default userRouter;
