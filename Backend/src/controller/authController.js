// Here controllers will be created for the routes.
import bcrypt from "bcrypt";

import { findUserByEmail, createUser, getAllUsers, updatePassword } from "../service/userService.js";
import { sendToken } from "../util/sendToken.js";



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
        // res.redirect()


    }catch(err){
        next(err);
    };
};

// Login user controller

export const login = async (req, res, next) => {
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.send("Please enter required details for login");
        }

        const user = await findUserByEmail(email);

        if(!user){
            return res.send("incorrect credentials");
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password);

            if(isMatch){
                sendToken(user, 200, "successfully logged In", res);
            }
            else{
                return res.send("incorrect credentials");
            }
        }

    }catch(err){
        return next(err);
    }
}

// Logout user Controller

export const logout = async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged out successfully"
    });
}

// Forgot Password Controller

export const forgotPassword = async (req, res, next) => {
    const {email, password} = req.body;

    // console.log("email: " + email);
    // console.log("Password: "+password);

    // Will check the user in Database if exist or not.
    try{
        const user = await findUserByEmail(email);

        if(!user){
            return res.send("User does not exist");
        }
        const userId = user.id;

        if(password.length < 8 || password.length > 16){
            return res.send("Length of password should be between 8 and 16 characters")
        }

        const newHashPassword = await bcrypt.hash(password, 10);

        const userWithUpdatedPassword = await updatePassword(userId, newHashPassword);

        res.send("Password changed successfully");
        //redirect to login page.

    }catch(err){
        return next(err);
    };
}

// Update New Password Controller

export const updateNewPassword = async (req, res, next) => {
    const userId = req.user.id;

    const {oldPassword, newPassword} = req.body;

    try{

        const isMatched = await bcrypt.compare(oldPassword, req.user.password);

        if(!isMatched){
            return res.send("Old Password is incorrect");
        }

        if(newPassword.length < 8 || newPassword.length > 16){
            return res.send("Length of password should be between 8 and 16 characters");
        }

        const newPasswordhash = await bcrypt.hash(newPassword, 10);

        const userWithUpdatedPassword = await updatePassword(userId, newPasswordhash);

        res.send("Password updated successfully");
        
    }catch(err){
        return next(err);
    }
}