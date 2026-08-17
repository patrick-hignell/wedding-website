import {
  Login,
  Guest,
  LoginGuests,
  LoginGuestsData,
} from '../../models/form.ts'
import db from './connection.ts'

export async function getAllLogins(): Promise<Login[]> {
  const logins = await db('logins').select(
    'id',
    'rsvp_received as rsvpReceived',
    'attending',
  )
  return logins
}

export async function getAllLoginsWithGuests(): Promise<LoginGuests[]> {
  const logins: Login[] = await db('logins').select({
    id: 'id',
    rsvpReceived: 'rsvp_received',
    attending: 'attending',
  })
  const guests: Guest[] = await db('guests').select({
    id: 'id',
    name: 'name',
    attending: 'attending',
    dietaryRequirements: 'dietaryRequirements',
    notes: 'notes',
    loginId: 'login_id',
  })

  const loginGuests = logins.map((login) => {
    return {
      ...login,
      guests: guests.filter((guest) => guest.loginId === login.id),
    }
  })
  return loginGuests
}

export async function getLoginGuestsById(id: string): Promise<LoginGuests> {
  const logins: Login[] = await db('logins').where('id', id).select({
    id: 'id',
    rsvpReceived: 'rsvp_received',
    attending: 'attending',
  })
  const guests: Guest[] = await db('guests').where('login_id', id).select({
    id: 'id',
    name: 'name',
    attending: 'attending',
    dietaryRequirements: 'dietaryRequirements',
    notes: 'notes',
    loginId: 'login_id',
  })

  const loginGuests = logins.map((login) => {
    return {
      ...login,
      guests: guests.filter((guest) => guest.loginId === login.id),
    }
  })
  return loginGuests[0]
}

export async function addLogins(loginGuests: LoginGuestsData): Promise<Login> {
  const addedLogin = (await db('logins')
    .insert({
      rsvp_received: loginGuests.rsvpReceived,
      attending: loginGuests.attending,
    })
    .returning(['id', 'rsvp_received as rsvpReceived', 'attending'])) as Login[]

  return addedLogin[0]
}

export async function updateLoginIds(
  loginGuests: LoginGuestsData,
  id: number,
): Promise<void> {
  const ids: number[] = loginGuests.guests.map((guest) => guest.id)
  await db('guests').whereIn('id', ids).update({ login_id: id })
}

export async function deleteLogin(id: number | string): Promise<number[]> {
  const deletedLogin = await db('logins').where({ id }).delete().returning('*')
  await db('guests').where('login_id', id).update({
    login_id: null,
  })
  return deletedLogin
}

export async function updateLoginGuests(
  party: LoginGuests,
): Promise<LoginGuests> {
  const editedLoginGuests = await db('logins')
    .where('id', party.id)
    .update({ rsvp_received: true })
    .returning('*')
  return editedLoginGuests[0]
}
