import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import {frontendURL} from "./config/env.js";
import {errorHandling} from "./middleware/errorMiddleware.js";
import { createUserTable } from "./model/createUserTable.js";
import { createBookTable } from "./model/createBookTable.js";
import { createBorrowReturnTable } from "./model/createBorrowReturnTable.js";
import authRouter from "./routes/authRouter.js";

export const app = express();

app.use(cors({
    origin: [frontendURL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create tables
createUserTable();
createBookTable();
createBorrowReturnTable();

// Router
app.use("/api/v1/auth", authRouter);

//Error handling Middleware

app.use(errorHandling);

