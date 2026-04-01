import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Accommodation({ party }: Props) {
  return (
    <div>
      <p>Accommodation</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
