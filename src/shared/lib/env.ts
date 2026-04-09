import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8080;
export const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5174";