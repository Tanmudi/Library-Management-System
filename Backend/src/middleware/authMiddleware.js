import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/env.js";
import { findUserById } from "../service/userService.js";


export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.send("User is not authenticated.")
    }
    const decoded = jwt.verify(token, jwtSecret);
    // console.log(decoded);
    req.user = await findUserById(decoded.id);
    next();
}

export const notAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    if(token){
        return res.send("User already logged in.");
    }
    next();
}