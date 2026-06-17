import pg from "pg";
import { dbUser, dbHost, dbDatabase, dbPassword, dbPort } from "./env.js";

const { Pool } = pg;

//creating a pool of connections whenever we need to connect to the database, we can use the pool to get a connection from the pool and release it back to the pool when we're done.

export const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbDatabase,
    password: dbPassword,
    port: dbPort
});

// Success event listener
pool.on("connect", () => {
    console.log("Database connected successfully");
})

// Error event listener
pool.on("error", (err) => {
    console.error("Unexpected error on database connection: ", err);
    process.exit(1);
});