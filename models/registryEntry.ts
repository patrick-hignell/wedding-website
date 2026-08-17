export interface RegistryEntryData {
  payment: number
  loginId: number
  registryId: number
}

export interface RegistryEntry extends RegistryEntryData {
  id: number
}
