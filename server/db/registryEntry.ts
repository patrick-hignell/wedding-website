import { RegistryEntry, RegistryEntryData } from '../../models/registryEntry.ts'
import db from './connection.ts'

export async function getAllRegistryEntries(): Promise<RegistryEntry[]> {
  const returning = await db('registry_entry').select()
  return returning as RegistryEntry[]
}

export async function addRegistryEntry(registryEntryData: RegistryEntryData) {
  const returning = (await db('registry_entry')
    .insert({
      payment: registryEntryData.payment,
      login_id: registryEntryData.loginId,
      registry_id: registryEntryData.registryId,
    })
    .returning([
      'id',
      'payment',
      'login_id as loginId',
      'registry_id as registryId',
    ])) as RegistryEntry[]
  return returning[0]
}

export async function editRegistryEntry(registryEntry: RegistryEntry) {
  const returning = await db('registry_item')
    .where('id', registryEntry.id)
    .update(registryEntry)
    .returning('*')
  return returning[0] as RegistryEntry
}

export async function deleteRegistryEntry(registryEntry: RegistryEntry) {
  const returning = await db('registry_item')
    .where('id', registryEntry.id)
    .delete()
    .returning('*')
  return returning
}
