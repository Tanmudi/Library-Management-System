import { pool } from "../config/db.js";

export const findUserByEmail = async (email) => {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    return user.rows[0];
}

export const createUser = async (name, email, password, mobile, address) => {
    const user = await pool.query("INSERT INTO users (name, email, password, mobile, address) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, password, mobile, address]);
    return user.rows[0];
}

export const findUserById = async(id) => {
    const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    return user.rows[0];
};

export const getAllUsers = async() => {
    const allUsers = await pool.query("SELECT * FROM users", []);
    // console.log(allUsers.rows);
    return allUsers.rows;
};

export const updatePassword = async(userId, newHashPassword) => {
    const newPassword = await pool.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [newHashPassword, userId]);

    return newPassword.rows[0];
}