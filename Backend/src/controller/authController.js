// Here controllers will be created for the routes.
import bcrypt from "bcrypt";

import { findUserByEmail, createUser } from "../service/userService.js";



// Register user controller

export const register = async (req, res, next) => {
    try{
        const { name, email, password, mobile, address } = req.body;
        
        if(!name || !email || !password || !mobile || !address){
            console.log("Please enter all the required details.");
            return res.send("Please enter all the required details.");
        }

        const isRegistered = await findUserByEmail(email);

        if(isRegistered){
            console.log("User already exists");
            return res.send("User already exists");
        }

        if(password.length < 8 || password.length > 16){
            console.log("Length of password should be between 8 and 16 characters");
            return res.send("Length of password should be between 8 and 16 characters")
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await createUser(name, email, hashPassword, mobile, address);

        res.send(user);

    }catch(err){
        next(err);
    };
};