import request from 'superagent'
import { Login, Guest } from '../../models/form'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllLogins(): Promise<Login[]> {
  const response = await request.get(`${rootURL}/logins`)
  return response.body as Login[]
}

export async function addLogin(guests: Guest[]): Promise<Login> {
  const response = await request.post(`${rootURL}/logins`).send(guests)
  return response.body as Login
}
