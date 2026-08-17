import db from './connection.ts'
import {
  Registry,
  RegistryData,
  RegistryWithEntries,
} from '../../models/registry'
import { RegistryEntry } from '../../models/registryEntry.ts'

export async function getAllRegistry(): Promise<Registry[]> {
  const registry = await db('registry').select()
  return registry as Registry[]
}

export async function getAllRegistryWithEntries(): Promise<
  RegistryWithEntries[]
> {
  const registry: Registry[] = await db('registry').select()
  const registryEntries: RegistryEntry[] = await db('registry_entry').select({
    id: 'id',
    payment: 'payment',
    loginId: 'login_id',
    registryId: 'registry_id',
  })

  const registryWithEntries = registry.map((item) => {
    return {
      ...item,
      entries: registryEntries.filter((entry) => entry.registryId === item.id),
    }
  })
  return registryWithEntries
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
