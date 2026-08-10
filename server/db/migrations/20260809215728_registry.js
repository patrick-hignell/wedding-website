/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('registry', (table) => {
    table.increments('id')
    table.string('name')
    table.string('location')
    table.string('bio')
    table.float('cost')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('registry')
}
