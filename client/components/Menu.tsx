import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Menu({ party }: Props) {
  return (
    <div>
      <p>Menu</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
