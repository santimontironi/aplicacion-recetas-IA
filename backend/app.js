import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { router as UserRoutes } from "./routes/user-routes.js";
import { router as RecipeRoutes } from "./routes/recipe-routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL_DEV,
    process.env.FRONTEND_URL_PROD
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use('',UserRoutes);
app.use('',RecipeRoutes)


export default app