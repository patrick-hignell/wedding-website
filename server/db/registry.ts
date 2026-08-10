import db from './connection.ts'
import { Registry, RegistryData } from '../../models/registry'

export async function getAllRegistry(): Promise<Registry[]> {
  const registry = await db('registry').select()
  return registry as Registry[]
}

export async function addRegistry(registryData: RegistryData) {
  const returningRegistry = await db('registry')
    .insert(registryData)
    .returning('*')
  return returningRegistry[0] as Registry
}

export async function editRegistry(registryItem: Registry) {
  const returningRegistry = await db('registry')
    .where('id', registryItem.id)
    .update(registryItem)
    .returning('*')
  return returningRegistry[0] as Registry
}

export async function deleteRegistry(registryItem: Registry) {
  const returningRegistry = await db('registry')
    .where('id', registryItem.id)
    .delete()
    .returning('*')
  return returningRegistry
}
