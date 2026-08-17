/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('logins', (table) => {
    table.increments('id')
    table.bool('rsvp_received')
    table.string('attending')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('logins')
}
