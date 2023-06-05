import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import { redisClient } from "./config";

dotenv.config();

redisClient.connect();

redisClient.on("error", (error) => {
  console.log("Redis connection error", error);
});

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

const server = http.createServer(app);

server.listen(5555, () => {
  console.log(`server running on port 5555`);
});
