import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'
import VenueSelector from './VenueSelector'

interface Props {
  party: LoginGuests
  venue: string | undefined
}

// Polynesian Spa - Deluxe romantic package - $ 409 PP ($818 per couple)
// Polynesian Spa - Double dipper deluxe - $ 117.95 pp
// Polynesian Spa - extra massage for leanne

// Prince Gate Hotel - King Room - $1268 ($317 per night)

// Redwoods - Night lights + day walk + glow worms - $95 PP

// Whakarewarewa - village tour, cultural experience, geo trails - $119 PP
// Whakarewarewa - hangi - $53 PP

export default function Registry({ party, venue }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <p className="m-6 text-center font-['georgia'] text-[2rem] tracking-[0.135em]">
        Registry
      </p>
      {party.attending == 'Cornwall' && <Oops />}
      {party.attending != 'Cornwall' && (
        <div>
          <div className="registry-item">
            <p>Polynesian Spa</p>
          </div>
          <div className="registry-item">
            <p>Princess Gate Hotel</p>
          </div>
        </div>
      )}
    </div>
  )
}
