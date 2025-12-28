import request from 'superagent'
import { Guest, GuestData } from '../../models/form'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllGuests(): Promise<Guest[]> {
  const response = await request.get(`${rootURL}/guests`)
  return response.body as Guest[]
}

export async function addGuest(guest: GuestData): Promise<Guest> {
  const response = await request.post(`${rootURL}/guests`).send(guest)
  return response.body as Guest
}

export async function addGuests(guests: GuestData[]): Promise<Guest[]> {
  const response = await request.post(`${rootURL}/guests`).send(guests)
  return response.body as Guest[]
}

export async function editGuest(guest: Guest): Promise<Guest> {
  const response = await request.put(`${rootURL}/guests`).send(guest)
  return response.body as Guest
}

export async function deleteGuest(guest: Guest): Promise<Guest> {
  const response = await request.delete(`${rootURL}/guests`).send(guest)
  return response.body as Guest
}
