export interface FormData {
  name: string
  attending: OptionType
  dietaryRequirements: string
  notes: string
}

export interface GuestData {
  name: string
  attending: string
  dietaryRequirements: string
  notes: string
}

export interface Guest extends GuestData {
  id: number
}

export interface OptionType {
  value: string
  label: string
}
