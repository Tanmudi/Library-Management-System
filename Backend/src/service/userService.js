import { pool } from "../config/db.js";

export const findUserByEmail = async (email) => {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    return user.rows[0];
}

export const createUser = async (name, email, password, mobile, address) => {
    const user = await pool.query("INSERT INTO users (name, email, password, mobile, address) VALUES ($1, $2, $3, $4, $5)", [name, email, password, mobile, address]);

    return user.rows[0];
}