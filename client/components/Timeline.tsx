import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'
import TimerWithParty from './TimerWithParty'

interface Props {
  party: LoginGuests
}

export default function Timeline({ party }: Props) {
  return (
    <div className="mb-28 flex flex-col items-center">
      <Header invite={true} />
      {party.attending == 'Cornwall' ? (
        <Oops />
      ) : (
        <div className="text-center font-['georgia'] text-xl  md:text-4xl">
          <TimerWithParty party={party} />
          <div className="mb-12 mt-16 font-['castoro'] tracking-[0.3em]">
            <p>Saturday 26th September</p>
            <p>Twenty Twenty Six</p>
          </div>
          <div className="source-serif-4 mb-12 font-light italic leading-relaxed tracking-[0.01em]">
            <p>Guests arrive at 3:00pm</p>
            <p>Ceremony commences at 3:30pm</p>
            <p>Photos at 4:15pm</p>
            <p>Canapés at 4:30pm</p>
            <p>Dinner at 6:30pm</p>
            <p>Celebrations end at Midnight</p>
          </div>
          <div className="mb-24 font-['castoro'] leading-relaxed tracking-[0.15em] md:text-3xl">
            <p>Gwavas Garden 5740</p>
            <p>State Highway 50</p>
            <p>RD4</p>
            <p>Waipawa 4274</p>
          </div>
        </div>
      )}
    </div>
  )
}
