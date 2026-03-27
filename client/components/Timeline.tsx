import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Timeline() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'timeline'} />
  return (
    <div>
      <p>Time in {venue}</p>
    </div>
  )
}
