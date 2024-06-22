// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "mysql", // "mysql" | "sqlite"
	schema: "./drizzle/schema.ts",
	out: "./drizzle/migrations",
	migrations: {
		table: 'custom_migration', // default `__drizzle_migrations`,
		// schema: 'public', // used in PostgreSQL only and default to `drizzle`
	},

	// this is for running the drizzle studio...
	dbCredentials: {
		host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ecommerce',
	}
});
