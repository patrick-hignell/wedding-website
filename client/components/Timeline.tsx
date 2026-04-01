import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Timeline({ party }: Props) {
  return (
    <div>
      <p>Timeline</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
