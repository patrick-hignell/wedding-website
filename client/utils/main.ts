export function getVenue(param: string | undefined) {
  if (param == 'cornwall-new-zealand') return 'Both'
  if (param == 'cornwall') return 'Cornwall'
  if (param == 'new-zealand') return 'New Zealand'
  return null
}

export function firstName(fullName: string) {
  return fullName.split(' ')[0]
}
