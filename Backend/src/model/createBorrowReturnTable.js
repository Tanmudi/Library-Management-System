import { pool } from "../config/db.js";

export const createBorrowReturnTable = async () => {
    const queryText = `CREATE TABLE IF NOT EXISTS borrowreturn(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    borrowed_on DATE DEFAULT CURRENT_DATE,
    returned_on DATE,
    fine NUMERIC DEFAULT 0,
    approved_by INTEGER REFERENCES users(id) ON DELETE CASCADE
);`

    try {
        await pool.query(queryText);
        console.log("Borrow Return Table created successfully");
    } catch (err) {
        console.error("Error in creating Borrow Return table:  " + err.stack);
    };
};