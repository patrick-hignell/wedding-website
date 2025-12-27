/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('guests', (table) => {
    table.increments('id')
    table.string('name')
    table.boolean('attending')
    table.string('dietaryRequirements').defaultTo(null)
    table.boolean('notes').defaultTo(null)
  })
}

export async function down(knex) {
  return knex.schema.dropTable('guests')
}
