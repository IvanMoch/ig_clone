import { createPool } from "mysql2/promise";
import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from "./config.js";

export const pool = createPool({
    connectionLimit: 10,
    port: DB_PORT,
    host: DB_HOST,
    user: DB_USER,  
    password: DB_PASSWORD,
    database: DB_NAME,
});

export async function checkConnection() {
    try {
        const connection = await pool.getConnection()
        console.log('connected successfully to the database')
    
    } catch (error) {
        console.error('error looking for the database: ', error)
    }
}

checkConnection();
