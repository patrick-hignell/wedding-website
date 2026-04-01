export function getVenue(invited: string | undefined) {
  if (invited == 'Both') return 'both'
  if (invited == 'Cornwall') return 'scorrier'
  if (invited == 'New Zealand') return 'gwavas'
  console.log(invited)
  return undefined
}

export function firstName(fullName: string) {
  return fullName.split(' ')[0]
}
