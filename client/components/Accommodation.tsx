import { LoginGuests } from '../../models/form'
import Header from './Header'
import VenueSelector from './VenueSelector'

interface Props {
  party: LoginGuests
  venue: string | undefined
}

export default function Accommodation({ party, venue }: Props) {
  return (
    <div>
      <Header />
      <p>Accommodation</p>
      {venue == 'Both' && <VenueSelector />}
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
