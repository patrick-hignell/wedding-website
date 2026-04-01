import { LoginGuests } from '../../models/form'
import Header from './Header'
import VenueDetails from './VenueDetails'
import VenueSelector from './VenueSelector'

interface Props {
  party?: LoginGuests
  venue: string | undefined
}

export default function Venue({ venue }: Props) {
  return (
    <div>
      <Header />
      <p>Venue</p>
      {venue == 'both' && <VenueSelector />}
      {venue == 'gwavas' && (
        <VenueDetails
          imageSrc="/images/GuavasHouse.png"
          imageAlt="Guava's house"
          date="26/09/26"
          venue="Gwavas Garden & Homestead"
          address="State Highway 50, Tikokino, 4274"
          country="New Zealand"
        />
      )}
      {venue == 'scorrier' && (
        <VenueDetails
          imageSrc="/images/ScorrierHouse7.png"
          imageAlt="Scorrier house"
          date="17/10/26"
          venue="Scorrier House"
          address="Scorrier, Redruth, Cornwall, TR16 5AU"
          country="England"
        />
      )}
    </div>
  )
}
