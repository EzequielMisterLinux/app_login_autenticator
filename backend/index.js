import { configDotenv } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser"; 
import MongoConnect from "./database/db.mongo.js";
import RouterUser from "./routers/user.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT;

server.use(cookieParser());
server.use(cors({
  origin: process.env.FRONTEND,
  credentials: true
}));
server.use(express.json());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

MongoConnect();

server.use("/api", RouterUser);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
