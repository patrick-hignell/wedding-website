import { Link } from 'react-router'
import VenueDetails from './VenueDetails'

export default function VenueSelector() {
  const currentUrl: string = window.location.href
  return (
    <div className="w-full">
      <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
        Please select a venue -
      </h2>
      <div className="flex flex-col items-center justify-evenly font-['Bellota'] text-2xl md:flex-row md:items-end">
        <Link to={`${currentUrl}/gwavas`}>
          <VenueDetails
            imageSrc="/images/GuavasHouse.png"
            imageAlt="Guava's house"
            date="26/09/26"
            venue="Gwavas Garden & Homestead"
            address="State Highway 50, Tikokino, 4274"
            country="New Zealand"
          />
        </Link>
        <Link to={`${currentUrl}/scorrier`}>
          <VenueDetails
            imageSrc="/images/ScorrierHouse7.png"
            imageAlt="Scorrier house"
            date="17/10/26"
            venue="Scorrier House"
            address="Scorrier, Redruth, Cornwall, TR16 5AU"
            country="England"
          />
        </Link>
      </div>
    </div>
  )
}
