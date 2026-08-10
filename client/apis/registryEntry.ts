import request from 'superagent'
import { RegistryEntry, RegistryEntryData } from '../../models/registryEntry'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllRegistryEntries(): Promise<RegistryEntry[]> {
  const response = await request.get(`${rootURL}/registryEntry`)
  return response.body as RegistryEntry[]
}

export async function addRegistryEntry(
  registryData: RegistryEntryData,
): Promise<RegistryEntry> {
  const response = await request
    .post(`${rootURL}/registryEntry`)
    .send(registryData)
  return response.body as RegistryEntry
}

export async function editRegistryEntry(
  registryItem: RegistryEntry,
): Promise<RegistryEntry> {
  const response = await request
    .put(`${rootURL}/registryEntry`)
    .send(registryItem)
  return response.body as RegistryEntry
}

export async function deleteRegistryEntry(
  registryItem: RegistryEntry,
): Promise<RegistryEntry> {
  const response = await request
    .delete(`${rootURL}/registryEntry`)
    .send(registryItem)
  return response.body as RegistryEntry
}
