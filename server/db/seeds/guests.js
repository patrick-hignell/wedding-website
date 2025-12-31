/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('guests').del()
  await knex('guests').insert([
    {
      id: 1,
      name: 'Leanne Murphy',
      attending: 'Both',
      dietaryRequirements: 'no onion please',
      notes: 'Bride',
    },
    {
      id: 2,
      name: 'Patrick Hignell',
      attending: 'Both',
      dietaryRequirements: 'none',
      notes: 'Groom',
    },
  ])
}
