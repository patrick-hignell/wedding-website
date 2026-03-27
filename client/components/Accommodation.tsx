import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Accommodation() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'accommodation'} />
  return (
    <div>
      <p>Stay in {venue}</p>
    </div>
  )
}
