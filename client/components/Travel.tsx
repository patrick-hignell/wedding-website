import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Travel() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'travel'} />
  return (
    <div>
      <p>Travel to {venue}</p>
    </div>
  )
}
