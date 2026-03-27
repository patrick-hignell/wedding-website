import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Venue() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'venue'} />
  return (
    <div>
      <p>Venue in {venue}</p>
    </div>
  )
}
