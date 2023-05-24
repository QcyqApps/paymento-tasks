import knex from "./database";

export async function checkDatabase(): Promise<void> {
    const databaseExistsResult: any = await knex.raw("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'paymento_tasks'");
    const databaseExists = databaseExistsResult.length > 0;

    if (databaseExists) {
        const tableExistsResult: any = await knex.raw("SHOW TABLES LIKE 'tasks'");
        const requiredTables = ["tasks"];
        const resultTables = tableExistsResult.map((row: any) => row[0][Object.keys(row[0])[0]]);
        const allTablesExist = requiredTables.every((table) => resultTables.includes(table));

        if (allTablesExist) {
            console.log("Database and tables exists.");
            return Promise.resolve();
        } else {
            console.error("Required tables not exists. Please run migrations and seeds");
            return Promise.reject();
        }
    } else {
        console.error("Database not exists. Please run migrations and seeds");
        return Promise.reject();
    }
}
