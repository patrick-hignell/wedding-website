import { LoginGuests } from '../../models/form'
import Header from './Header'
import VenueSelector from './VenueSelector'

interface Props {
  party: LoginGuests
  venue: string | undefined
}

export default function Timeline({ party, venue }: Props) {
  return (
    <div>
      <Header />
      <p>Timeline</p>
      {venue == 'Both' && <VenueSelector />}
      {party.guests.map((guest) => (
        <p key={guest.name}>{guest.name}</p>
      ))}
    </div>
  )
}
