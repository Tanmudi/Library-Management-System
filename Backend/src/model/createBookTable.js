import { pool } from "../config/db.js";

export const createBookTable = async () => {

    const queryText = `CREATE TABLE IF NOT EXISTS books(
    ID SERIAL PRIMARY KEY,
    book_name VARCHAR(500) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    writer VARCHAR(100) NOT NULL,
    description TEXT,
    cost NUMERIC NOT NULL,
    stock INTEGER NOT NULL,
    listed_on TIMESTAMPTZ DEFAULT NOW()
);`

    try {
        await pool.query(queryText);
        console.log("Books Table created successfully");
    } catch (err) {
        console.error("Error in creating books table " + err.stack);
    };
};