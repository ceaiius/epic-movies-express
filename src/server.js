import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();

app.use(json()); // Parse JSON request bodies
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS for frontend
app.use(cookieParser()); // To handle cookies
app.use(morgan("dev")); // Logs requests for debugging
// Connect to MongoDB
connectDB();
// Basic Route
app.get("/", (req, res) => {
  res.send("Welcome to the Social App Backend!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
