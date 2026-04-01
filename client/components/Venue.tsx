import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Venue({ party }: Props) {
  return (
    <div>
      <p>Venue</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
