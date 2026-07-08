import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});