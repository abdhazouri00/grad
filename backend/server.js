import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
configDotenv({ path: "./config.env" });

//App Config
const app = express();
const port = process.env.PORT || 3000;
const DB = process.env.DATABASE;
connectDB(DB);
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API ENDPOINT");
});

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
