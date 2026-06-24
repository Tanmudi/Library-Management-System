import jwt from "jsonwebtoken";
import { jwtSecret, jwtTokenExpire } from "../config/env.js";


export const generateToken = (user) => {
    const userId = user.id;

    return jwt.sign({id: userId}, jwtSecret, {
        expiresIn: jwtTokenExpire
    })
}