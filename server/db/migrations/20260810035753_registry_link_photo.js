/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.table('registry', (table) => {
    table.string('link')
    table.string('image')
  })
}

export async function down(knex) {
  return knex.schema.table('registry', (table) => {
    table.dropColumn('link')
    table.dropColumn('image')
  })
}
