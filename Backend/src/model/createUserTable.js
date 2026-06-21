// In this file, we will create Table.

import { pool } from "../config/db.js";


export const createUserTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(800) NOT NULL,
    address TEXT NOT NULL,
    mobile TEXT CHECK (length(mobile)=10) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('Admin', 'User')) DEFAULT 'User',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verification_code INTEGER,
    verification_code_expired TIMESTAMPTZ,
    reset_password_token TEXT,
    reset_password_expired TIMESTAMPTZ
);`

    try {
        await pool.query(queryText);
        console.log("User Table created Successfully");
    } catch (err) {
        console.error("Error in creating user Table", err.stack);
    }
};