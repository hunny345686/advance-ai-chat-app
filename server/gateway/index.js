import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookiesParser from "cookie-parser"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(cors({
  origin:process.env.CLIENT_URL,credentials:true
}));
app.use(cookiesParser())

app.use("/auth",proxy(process.env.AUTH_SERVICE_URL));

app.get("/", (req, res) => {
  res.send("Welcome to the Gateway Server");
});


app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});