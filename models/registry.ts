export interface RegistryData {
  name: string
  location: string
  bio?: string
  cost: number
  link?: string
  image?: string
}

export interface Registry extends RegistryData {
  id: number
}
