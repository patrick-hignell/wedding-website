import { useParams } from 'react-router'
import { getVenue } from '../utils/main'
import VenueSelector from './VenueSelector'

export default function Menu() {
  const params = useParams()
  const venue = getVenue(params.venue)

  if (venue == null) return <VenueSelector page={'menu'} />
  return (
    <div>
      <p>Food from {venue}</p>
    </div>
  )
}
