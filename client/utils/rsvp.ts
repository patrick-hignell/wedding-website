import { TimeRemaining } from '../../models/time'

export function getGuestNo(inviteString: string) {
  switch (inviteString) {
    case 'tahi':
      return 1
    case 'onan':
      return 1
    case 'rua':
      return 2
    case 'dew':
      return 2
    case 'toru':
      return 3
    case 'tri':
      return 3
    case 'wha':
      return 4
    case 'peswar':
      return 4
    case 'rima':
      return 5
    case 'pymp':
      return 5
    default:
      return 1
  }
}

export function getTimeRemaining(endtime: string): TimeRemaining {
  const total = Math.max(
    Date.parse(endtime) - Date.parse(new Date().toString()),
    0,
  )
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0)
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0)
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0)
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0)

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  }
}
