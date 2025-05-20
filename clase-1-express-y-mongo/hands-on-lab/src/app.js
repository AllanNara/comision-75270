import express from "express";
import userRouter from "./routes/user.router.js";
import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/class-zero";
const PORT = 8080;
const app = express();

app.use(express.json())
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.log("Error MongoDB connection: " + e.message));
