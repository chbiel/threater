import { createDb, migrate } from "postgres-migrations";
import { Client } from "pg";
import path from "path";

const DATABASE_NAME = "threater";

const migrateDatabase = async () => {
    const dbConfig = {
        database: DATABASE_NAME,
        user: "postgres",
        host: "localhost",
        port: 5432,
    }

    const client = new Client({
        ...dbConfig,
        database: "postgres",
    })
    await client.connect()
    
    try {
        await createDb(DATABASE_NAME, {client})
    } finally {
        await client.end()
    }

    {
        const client = new Client(dbConfig) // or a Pool, or a PoolClient
        await client.connect()
        try {
            await migrate({client}, path.resolve(__dirname, 'files'))
        } finally {
            await client.end()
        }
    }
}

migrateDatabase();