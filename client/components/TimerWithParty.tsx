import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { TimeRemaining } from '../../models/time'
import { getTimeRemaining } from '../utils/rsvp'
import { LoginGuests } from '../../models/form'

interface Props {
  party: LoginGuests
}

export default function TimerWithParty({ party }: Props) {
  const [datePassed, setDatePassed] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>()
  const arrivalDate: string = new Date(
    '2026-09-26T03:00:00.000Z',
  ).toDateString()
  const secondArrivalDate: string = new Date(
    '2027-10-09T16:00:00.000Z',
  ).toDateString()

  const venue = party.attending

  function checkTime() {
    let time
    if (venue === 'Both') {
      time =
        datePassed === false
          ? getTimeRemaining(arrivalDate)
          : getTimeRemaining(secondArrivalDate)
    } else if (venue === 'New Zealand') {
      time = getTimeRemaining(arrivalDate)
    } else {
      time = getTimeRemaining(secondArrivalDate)
    }
    setTimeLeft(time)
    if (
      Number(time.total) +
        Number(time.days) +
        Number(time.hours) +
        Number(time.minutes) +
        Number(time.seconds) ===
      0
    ) {
      setDatePassed(true)
    }
  }

  useEffect(() => {
    checkTime()
    const timer = setInterval(() => {
      checkTime()
    }, 1000)

    return () => clearInterval(timer)
  }, [venue])

  return (
    <div>
      {timeLeft && (
        <p className="text-center font-['MonteCarlo'] text-5xl tracking-wide sm:text-6xl md:text-8xl">
          <span className="inline-block md:w-40">{timeLeft.days}</span> :{' '}
          <span className="inline-block w-12 sm:w-16 md:w-32">
            {timeLeft.hours}
          </span>{' '}
          :{' '}
          <span className="inline-block w-12 sm:w-16 md:w-32">
            {timeLeft.minutes}
          </span>{' '}
          :{' '}
          <span className="inline-block w-12 sm:w-16 md:w-32">
            {timeLeft.seconds}
          </span>
        </p>
      )}
    </div>
  )
}
