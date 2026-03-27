import { useParams } from 'react-router'
import Timer from './Timer'
import VenueDetails from './VenueDetails'
import VenueSelector from './VenueSelector'
import { getVenue } from '../utils/main'

function App() {
  const params = useParams()
  const venue = getVenue(params.venue)
  return (
    <div className="flex flex-col items-center">
      <h1
        className={`-mb-6 -mt-5 text-center font-['MonteCarlo'] text-[6rem] lg:text-[9rem]`}
      >
        Leanne{' '}
        <span className=" -my-10 block px-4 font-['Imperial_Script'] md:inline">
          &
        </span>{' '}
        Patrick
      </h1>
      <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
        invite you to their wedding celebration
      </h2>
      <Timer />
      {(venue == null || venue == 'Both') && <VenueSelector />}
      {venue == 'New Zealand' && (
        <div className="flex flex-col items-center justify-evenly font-['Bellota'] text-2xl md:flex-row md:items-end">
          <VenueDetails
            imageSrc="/images/GuavasHouse.png"
            imageAlt="Guava's house"
            date="26/09/26"
            venue="Gwavas Garden & Homestead"
            address="State Highway 50, Tikokino, 4274"
            country="New Zealand"
          />
        </div>
      )}
      {venue == 'Cornwall' && (
        <div className="flex flex-col items-center justify-evenly font-['Bellota'] text-2xl md:flex-row md:items-end">
          <VenueDetails
            imageSrc="/images/ScorrierHouse7.png"
            imageAlt="Scorrier house"
            date="17/10/26"
            venue="Scorrier House"
            address="Scorrier, Redruth, Cornwall, TR16 5AU"
            country="England"
          />
        </div>
      )}
    </div>
  )
}

export default App
