import { Login, LoginData, Guest } from '../../models/form.ts'
import db from './connection.ts'

export async function getAllLogins(): Promise<Login[]> {
  const logins = await db('logins').select(
    'id',
    'rsvp_received as rsvpReceived',
    'attending',
  )
  return logins
}

export async function addLogins(guests: Guest[]): Promise<Login> {
  const loginData: LoginData = { rsvpReceived: true, attending: 'Neither' }
  let cornwallAttendance: boolean = false
  let newZealandAttendance: boolean = false
  guests.forEach((guest) => {
    switch (guest.attending) {
      case 'Both':
        cornwallAttendance = true
        newZealandAttendance = true
        break
      case 'Cornwall':
        cornwallAttendance = true
        break
      case 'New Zealand':
        newZealandAttendance = true
        break
      default:
        break
    }
  })
  if (cornwallAttendance && newZealandAttendance) {
    loginData.attending = 'Both'
  } else if (cornwallAttendance) {
    loginData.attending = 'Cornwall'
  } else if (newZealandAttendance) {
    loginData.attending = 'New Zealand'
  }
  const addedLogin = (await db('logins')
    .insert({
      rsvp_received: loginData.rsvpReceived,
      attending: loginData.attending,
    })
    .returning(['id', 'rsvp_Received as rsvpReceived', 'attending'])) as Login

  console.log(addedLogin)

  return addedLogin
}

export async function updateLoginIds(
  guests: Guest[],
  loginId: number,
): Promise<void> {
  const ids: number[] = guests.map((guest) => guest.id)
  console.log(ids)
  console.log(`loginid: ${loginId}`)
  const updatedGuests = await db('guests')
    .whereIn('id', ids)
    .update({ login_id: loginId })
  console.log(updatedGuests)
}

export async function deleteLogin(id: number | string): Promise<number[]> {
  const deletedLogin = await db('logins').where({ id }).delete().returning('*')
  await db('guests').where('login_id', id).update({
    login_id: null,
  })
  return deletedLogin
}
