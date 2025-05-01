import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  title: { type: String },
  chatId: {
    type: String,
  },
  messages: [messageSchema],
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    billingEmail: { type: String },
    password: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    phoneNumber: { type: String },
    company: { type: String },
    plan: { type: String, default: "None" },
    credit: { type: Number },
    chats: [chatSchema],
    chatToken: { type: String },
    chatId : {type : String},
  },
  { minimize: false }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
