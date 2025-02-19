import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    return res.json({
      statusCode: 200,
      message: "Login successful",
      token: token,
      id: user._id,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      statusCode: 500, // Changed status code to indicate server error
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

export { loginUser, registerUser, getUserInfo };
