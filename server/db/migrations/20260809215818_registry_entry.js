/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('registry_entry', (table) => {
    table.increments('id')
    table.float('payment')
    table.integer('login_id')
    table.integer('registry_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('registry_entry')
}
