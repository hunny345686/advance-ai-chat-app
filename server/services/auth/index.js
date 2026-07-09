import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 7001;

app.use(express.json());
app.use("/", authRouter);




app.listen(PORT, () => {
  console.log(`Auth server is running on port ${PORT}`);
  connectDB(process.env.MONGO_URI);
});