import dotenv from "dotenv";

// dotenv.config() looks for .env file in the root directory by default, so we need to specify the path
dotenv.config({ path: "./src/config/.env" }); 

export const port = process.env.BACKEND_PORT;
export const frontendURL = process.env.FRONTEND_URL;