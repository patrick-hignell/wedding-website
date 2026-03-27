import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Registry() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'registry'} />
  return (
    <div>
      <p>Give us gifts in {venue}</p>
    </div>
  )
}
