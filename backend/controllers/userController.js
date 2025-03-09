import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserCredit = async (req, res) => {
  try {
    const { userId, amount, increase } = req.body;

    if (!userId || amount === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and amount are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!increase) {
      if (user.credit < amount) {
        return res.status(400).json({ message: "Insufficient credit." });
      }
    }

    if (increase) {
      user.credit += amount;
    } else {
      user.credit -= amount;
    }
    await user.save();

    res
      .status(200)
      .json({ message: "User credit updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || plan === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and plan are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.plan = plan;
    await user.save();

    res.status(200).json({ message: "plan updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updateBillingEmail = async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId || email === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and amounemail are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.billingEmail = email;
    await user.save();

    res
      .status(200)
      .json({ message: "billing email updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { userId, country } = req.body;

    if (!userId || country === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and country are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.country = country;
    await user.save();

    res.status(200).json({ message: "country updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updateCity = async (req, res) => {
  try {
    const { userId, city } = req.body;

    if (!userId || city === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and city are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.city = city;
    await user.save();

    res.status(200).json({ message: "city updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updatePhoneNumber = async (req, res) => {
  try {
    const { userId, phone } = req.body;

    if (!userId || phone === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and phone are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.phone = phone;
    await user.save();

    res.status(200).json({ message: "phone updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { userId, company } = req.body;

    if (!userId || company === undefined) {
      return res
        .status(400)
        .json({ message: "User ID and company are required." });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.company = company;
    await user.save();

    res.status(200).json({ message: "company updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error.", error });
  }
};

const LoadChats = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      chats: user.chats,
    });
  } catch (error) {
    res.status(500).json({ message: "Error loading chats", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        statusCode: 401,
        message: "Password does not match",
      });
    }

    const token = createToken(user._id);

    let response = {
      statusCode: 200,
      message: "Login successful",
      token: token,
      id: user._id,
      credit: user.credit,
    };

    if (user.plan !== "None") {
      response.credit = user.credit;
    }

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, credit } = req.body;

    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        message: "user exists",
        statusCode: 300,
      });
    }

    if (validator.isEmail(email) === false) {
      return res.json({
        message: "email invalid",
        statusCode: 400,
      });
    }

    if (password.length < 8) {
      return res.json({
        message: "password too short",
        statusCode: 400,
      });
    }

    //Hashing password

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      credit,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      statusCode: 200,
      message: "user created",
      token: token,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.json({
      message: "Failed threw error",
      error: error.message,
    });
  }
};

const saveChat = async (req, res) => {
  const { userId, messages } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newChat = {
      chatId: new mongoose.Types.ObjectId(),
      title: "chat",
      messages: messages || [],
    };

    user.chats.push(newChat);
    await user.save();

    res.status(201).json({ message: "Chat added successfully", chat: newChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateChat = async (req, res) => {
  const { userId, messages, chatId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const chat = user.chats.find((chat) => chat.chatId.toString() === chatId);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    chat.messages.push(...messages);
    await user.save();

    res.json({ message: "Messages added", chat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
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
};
