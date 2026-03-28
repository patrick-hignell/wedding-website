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
  loginId?: number
}

export interface Guest extends GuestData {
  id: number
}

export interface LoginData {
  rsvpReceived: boolean
  attending: string
}

export interface Login extends LoginData {
  id: number
}

export interface OptionType {
  value: string
  label: string
}
