import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function Registry({ party }: Props) {
  return (
    <div>
      <p>Registry</p>
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
