import { Guest, GuestData } from '../../models/form.ts'
import db from './connection.ts'

export async function getAllGuests(): Promise<Guest[]> {
  const guests = await db('guests').select()
  // console.log(guests)
  return guests
}

export async function addGuest(guest: GuestData): Promise<Guest> {
  const addedGuest = await db('guests').insert(guest).returning('*')
  return addedGuest[0]
}

export async function addGuests(guests: GuestData[]): Promise<Guest[]> {
  const addedGuests = await db('guests').insert(guests).returning('*')
  return addedGuests
}

export async function deleteGuest(id: number | string): Promise<number[]> {
  const deletedGuest = await db('guests').where({ id }).delete().returning('*')
  return deletedGuest
}

export async function updateGuest(
  id: number | string,
  guest: Guest,
): Promise<Guest> {
  const updatedGuest = await db('guests')
    .where({ id })
    .update(guest)
    .returning('*')
  return updatedGuest[0]
}
