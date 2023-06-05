import dotenv from "dotenv";
import { Pool } from "pg";
import { createClient } from 'redis';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});
