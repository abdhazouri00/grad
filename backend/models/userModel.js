import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  title: { type: String, default: "Chat" },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
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
  },
  { minimize: false }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
