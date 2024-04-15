/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("bookmarks", (table) => {
        table.increments("id").primary();
        table.integer("userId").unsigned();
        table.string("bookId").notNullable();
        table.foreign('userId').references('users.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("bookmarks");
};
