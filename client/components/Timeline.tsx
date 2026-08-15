import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'

interface Props {
  party: LoginGuests
}

export default function Timeline({ party }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <p className="mb-6  text-center font-['MonteCarlo'] text-[5rem]  ">
        Timeline
      </p>
      {party.attending != 'Cornwall' ? (
        <div>
          <p>See you in NZ!</p>
        </div>
      ) : (
        <Oops />
      )}
    </div>
  )
}
