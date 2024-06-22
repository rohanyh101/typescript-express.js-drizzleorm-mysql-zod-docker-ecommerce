import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../../drizzle/schema";
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2";

const client = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectionLimit: 10,
	queueLimit: 0,
	waitForConnections: true,
});

export const db = drizzle(client, { schema, mode: "default" });
