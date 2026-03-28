/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.table('guests', (table) => {
    table.integer('login_id') // Example: creates a varchar(128) column
    // You can add constraints like notNullable(), unique(), etc.
    // table.integer('age').notNullable().defaultTo(0);
  })
}

export async function down(knex) {
  return knex.schema.table('guests', (table) => {
    table.dropColumn('login_id')
  })
}
