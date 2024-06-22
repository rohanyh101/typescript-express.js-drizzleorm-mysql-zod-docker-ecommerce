import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'

async function main() {
    const migrationCLient = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ecommerce',
    })

    await migrate(drizzle(migrationCLient), {
        migrationsFolder: './drizzle/migrations'
    })

    console.log('Migration completed! 🎉')
    migrationCLient.end()
}

main()