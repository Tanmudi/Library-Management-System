import express from "express";
import { register, login, logout, forgotPassword, updateNewPassword } from "../controller/authController.js"
import { isAuthenticated, notAuthenticated } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", notAuthenticated, register);
authRouter.post("/login", notAuthenticated, login);
authRouter.get("/logout", isAuthenticated, logout);
authRouter.post("/forgotpassword", notAuthenticated, forgotPassword);
authRouter.post("/updatepassword", isAuthenticated, updateNewPassword);


export default authRouter;