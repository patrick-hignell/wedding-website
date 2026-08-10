import request from 'superagent'
import { Registry, RegistryData } from '../../models/registry'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllRegistry(): Promise<Registry[]> {
  const response = await request.get(`${rootURL}/registry`)
  return response.body as Registry[]
}

export async function addRegistry(
  registryData: RegistryData,
): Promise<Registry> {
  const response = await request.post(`${rootURL}/registry`).send(registryData)
  return response.body as Registry
}

export async function editRegistry(registryItem: Registry): Promise<Registry> {
  const response = await request.put(`${rootURL}/registry`).send(registryItem)
  return response.body as Registry
}

export async function deleteRegistry(
  registryItem: Registry,
): Promise<Registry> {
  const response = await request
    .delete(`${rootURL}/registry`)
    .send(registryItem)
  return response.body as Registry
}
