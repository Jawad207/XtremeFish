import express from "express";
import authentication from "./routes/authentication.js";
import dashboard from "./routes/dashboard.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import https from "https";

dotenv.config();
const port = process.env.PORT || 8443; // Common HTTPS port
const MONGODB_URI = process.env.MONGODB_URI;

// Load SSL/TLS certificates (ensure these paths are correct)


// Initialize Express app
const server = express();
server.use(cors());
server.use(express.json());
server.set("trust proxy", true); // Trust proxy headers (important for X-Forwarded-For)

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log(`Connected to MongoDB `);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    setTimeout(connectToMongoDB, 5000); // Retry after 5 seconds
  }
};
connectToMongoDB();


// Example custom API route
server.get("/api/custom", (req, res) => {
  res.json({ message: "Hello from HTTPS server!" });
});

// Add routes
server.use("/auth", authentication);
server.use("/dashboard", dashboard);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port} and on uri ${MONGODB_URI}`);
});


// Create and start the HTTPS server
// https.createServer(httpsOptions, server).listen(port, (err) => {
//   if (err) throw err;
//   console.log(`Server running securely on https://localhost:${port}`);
// });
