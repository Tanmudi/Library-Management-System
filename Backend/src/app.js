import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import {frontendURL} from "./config/env.js";


export const app = express();

app.use(cors({
    origin: [frontendURL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));