import { Login, LoginData, Guest } from '../../models/form.ts'
import db from './connection.ts'

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

  await db('guests')
    .where(
      'id',
      guests.map((guest) => guest.id),
    )
    .update({ login_id: addedLogin.id })
    .returning('*')

  return addedLogin
}
