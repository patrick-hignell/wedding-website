import { LoginGuests } from '../../models/form'
import FlowerDisplay from './FlowerDisplay'
import Header from './Header'
import VenueSelector from './VenueSelector'

interface Props {
  party: LoginGuests
  venue: string | undefined
}

export default function Travel({ party, venue }: Props) {
  return (
    <div className="grid [grid-template-areas:'overlap']">
      <div className="[grid-area:overlap]">
        <FlowerDisplay />
      </div>
      <div className="z-50 flex flex-1 flex-col [grid-area:overlap]">
        <Header />
        <p>Travel</p>
        {venue == 'Both' && <VenueSelector />}
        {party.guests.map((guest) => (
          <p key={guest.name}>{guest.name}</p>
        ))}
      </div>
      <div className="[grid-area:overlap]">
        <FlowerDisplay />
      </div>
    </div>
  )
}
