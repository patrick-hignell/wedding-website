import request from 'superagent'
import { LoginGuests } from '../../models/form'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllLoginGuests(): Promise<LoginGuests[]> {
  const response = await request.get(`${rootURL}/logins/login-guests`)
  return response.body as LoginGuests[]
}
