import { LoginGuests } from '../../models/form'
import Timer from './Timer'

interface Props {
  party: LoginGuests
}

export default function Rsvp({ party }: Props) {
  return (
    <div>
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
      <div className="mt-8 flex w-full flex-col items-center">
        {party.guests.map((guest) => (
          <div key={guest.id} className="font-[Bellota] text-3xl">
            <div className="flex">
              <p>{guest.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
