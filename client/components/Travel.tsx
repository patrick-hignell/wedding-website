import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Travel({ party }: Props) {
  return (
    <div>
      <p>Travel</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
