import { LoginGuests } from '../../models/form'
import Header from './Header'
import VenueSelector from './VenueSelector'

interface Props {
  party: LoginGuests
  venue: string | undefined
}

export default function Menu({ party, venue }: Props) {
  return (
    <div>
      <Header />
      <p>Menu</p>
      {venue == 'Both' && <VenueSelector />}
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
