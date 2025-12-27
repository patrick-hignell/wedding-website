import { useEffect, useState } from 'react'
import { TimeRemaining } from '../../models/time'

function Cornwall() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>()
  const arrivalDate: string = new Date(
    '2026-10-17T16:00:00.000Z',
  ).toDateString()

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeRemaining(arrivalDate)
      setTimeLeft(time)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getTimeRemaining(endtime: string): TimeRemaining {
    const total = Date.parse(endtime) - Date.parse(new Date().toString())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    }
  }

  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold underline">Cornwall</h1>
        <p>17/10/26 3pm</p>
        {timeLeft && (
          <p>
            {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
            {timeLeft.seconds}
          </p>
        )}
      </div>
    </>
  )
}

export default Cornwall
