import { Link } from 'react-router'
import VenueDetails from './VenueDetails'

interface Props {
  page?: string
  bothOption?: boolean
}

export default function VenueSelector({ page, bothOption }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
        Please select a venue -
      </h2>
      <div className="flex flex-col items-center justify-evenly font-['Bellota'] text-2xl md:flex-row md:items-end">
        <Link to={`/new-zealand${page != null ? `/${page}` : ''}`}>
          <VenueDetails
            imageSrc="/images/GuavasHouse.png"
            imageAlt="Guava's house"
            date="26/09/26"
            venue="Gwavas Garden & Homestead"
            address="State Highway 50, Tikokino, 4274"
            country="New Zealand"
          />
        </Link>
        <Link to={`/cornwall${page != null ? `/${page}` : ''}`}>
          <VenueDetails
            imageSrc="/images/ScorrierHouse7.png"
            imageAlt="Scorrier house"
            date="17/10/26"
            venue="Scorrier House"
            address="Scorrier, Redruth, Cornwall, TR16 5AU"
            country="England"
          />
        </Link>
        {bothOption && (
          <Link to={`/cornwall-new-zealand${page != null ? `/${page}` : ''}`}>
            <VenueDetails venue="Both" />
          </Link>
        )}
      </div>
    </div>
  )
}
