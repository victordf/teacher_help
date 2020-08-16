import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();

    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt');
    table.dateTime('deletedAt');
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}

