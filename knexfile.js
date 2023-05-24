module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'paymento_tasks',
        },
        migrations: {
            directory: './database/migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './database/seeds',
        },
    },
};
