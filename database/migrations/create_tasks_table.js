exports.up = function (knex) {
    return knex.schema.createTable("tasks", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.date("startDate").notNullable();
        table.date("deadline").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("tasks");
};
