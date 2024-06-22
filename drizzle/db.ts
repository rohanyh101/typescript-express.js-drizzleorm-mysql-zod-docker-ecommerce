import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
      });
      
    await drizzle(connection, { schema, mode: 'default', logger: true});
}

main()

// don't need this, use connection pool in the src insted...

// prefered way,
// for migrations and stuff use the above method,
// for database queries use the connection pooling method...