export interface RegistryData {
  name: string
  location: string
  bio: string
  cost: number
}

export interface Registry extends RegistryData {
  id: number
}
