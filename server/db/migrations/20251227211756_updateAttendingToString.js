/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.alterTable('guests', function (table) {
    // Change the 'column_name' to the new type (e.g., from 'string' to 'text')
    table.string('attending').alter() // Use .alter() to modify an existing column
    table.string('notes').alter()
  })
}

export async function down(knex) {
  return knex.schema.alterTable('guests', function (table) {
    // Define how to revert the change in the down migration (optional but recommended)
    // Note: Reverting type changes might require careful data handling depending on the original type
    table.boolean('attending').alter()
    table.boolean('notes').alter()
  })
}
