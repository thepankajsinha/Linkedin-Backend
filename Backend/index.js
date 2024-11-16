import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/database.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config();

const app = express();

// Import environment variables
const PORT = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",  // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],  // Allowed headers
  credentials: true,  // Allow cookies or authentication headers
};

// Middlewares
app.use(express.json()); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());
app.use(cors(corsOptions));  // Apply CORS middleware with custom options

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
