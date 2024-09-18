// server.js
import express from "express";
import authentication from "./routes/authentication.js";
import dashboard from "./routes/dashboard.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const server = express();
server.use(cors());
const MONGODB_URI = process.env.MONGODB_URI;
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jawadulhassan18:nvVug7P8EEaree9a@cluster0.ivefb.mongodb.net/",
      {}
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    // Retry after a delay
    setTimeout(connectToMongoDB, 5000); // Retry every 5 seconds
  }
};

// Start MongoDB connection
connectToMongoDB();

server.use(express.json());
server.set("trust proxy", true);

// Example: Custom API route in Express
server.get("/api/custom", (req, res) => {
  res.json({ message: "Hello from custom Node.js server!" });
});

server.use("/auth", authentication);
server.use("/dashboard", dashboard);

server.listen(8080, (err) => {
  if (err) throw err;
  console.log("Server running on http://localhost:8080");
});
