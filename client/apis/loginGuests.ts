import request from 'superagent'
import { LoginGuests } from '../../models/form'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllLoginGuests(): Promise<LoginGuests[]> {
  const response = await request.get(`${rootURL}/logins/login-guests`)
  return response.body as LoginGuests[]
}

export async function getLoginGuestsById(id: string): Promise<LoginGuests> {
  const response = await request.get(
    `${rootURL}/logins/login-guests-by-id/${id}`,
  )
  return response.body as LoginGuests
}

export async function editLoginGuests(
  party: LoginGuests,
): Promise<LoginGuests> {
  const response = await request.put(`${rootURL}/logins`).send(party)
  return response.body as LoginGuests
}
