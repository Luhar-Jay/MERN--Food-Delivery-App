import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { configDotenv } from "dotenv";
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";

configDotenv();

// app config
const app = express();
const port = 8080;

// middleware

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("API Working");
});
connectDb();

// api endpoints
app.use("/api/v1/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Surver is running on:  ${port}`);
});
