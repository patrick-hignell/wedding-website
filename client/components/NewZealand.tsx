import { ChangeEvent, useEffect, useState } from 'react'
import { TimeRemaining } from '../../models/time'
import { FormData } from '../../models/form'
import { useParams } from 'react-router-dom'

function NewZealand() {
  const blankData: FormData = {
    name: '',
    attending: true,
    dietaryRequirements: '',
    notes: '',
  }
  const params = useParams()
  const guestNo = getGuestNo(params.invites as string)
  const [formData, setFormData] = useState<FormData[]>(
    new Array(guestNo).fill({ ...blankData }),
  )
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>()
  const arrivalDate: string = new Date(
    '2026-09-26T03:00:00.000Z',
  ).toDateString()

  useEffect(() => {
    const timer = setInterval(() => {
      const time = getTimeRemaining(arrivalDate)
      setTimeLeft(time)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function getGuestNo(inviteString: string) {
    switch (inviteString) {
      case 'tahi':
        return 1
      case 'onan':
        return 1
      case 'rua':
        return 2
      case 'dew':
        return 2
      case 'toru':
        return 3
      case 'tri':
        return 3
      case 'wha':
        return 4
      case 'peswar':
        return 4
      case 'rima':
        return 5
      case 'pymp':
        return 5
      default:
        return 0
    }
  }

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

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    const { name, value } = e.target
    // Update the state using a functional update to ensure the latest state is used

    setFormData((prevData) => {
      const data = prevData
      data[index] = { ...data[index], [name]: value }
      return [...data]
    })
    // console.log(formData)
  }

  function handleCheckboxChange(
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    setFormData((prevData) => {
      const data = prevData
      data[index] = { ...data[index], attending: e.target.checked }
      return [...data]
    })
    // console.log(formData)
  }

  // console.log(getGuestNo(params.invites as string))
  // console.log(formData)

  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold underline">New Zealand</h1>
        <p>26/09/26 3pm</p>
        {timeLeft && (
          <p>
            {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
            {timeLeft.seconds}
          </p>
        )}
        {formData && (
          <form>
            {formData.map((attendee, index) => (
              <div key={index}>
                <label htmlFor="name">
                  Full name (as you wish it to appear on the invitation)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData[index].name}
                  onChange={(e) => handleInputChange(e, index)}
                ></input>
                <label htmlFor="attending">Are you attending?</label>
                <input
                  type="checkbox"
                  id="attending"
                  name="attending"
                  checked={formData[index].attending}
                  onChange={(e) => handleCheckboxChange(e, index)}
                ></input>
                <label htmlFor="dietaryRequirements">
                  Any dietary requirements?
                </label>
                <input
                  type="text"
                  id="dietaryRequirements"
                  name="dietaryRequirements"
                  value={formData[index].dietaryRequirements}
                  onChange={(e) => handleInputChange(e, index)}
                ></input>
                <label htmlFor="notes">Any additional notes?</label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  value={formData[index].notes}
                  onChange={(e) => handleInputChange(e, index)}
                ></input>
              </div>
            ))}
          </form>
        )}
      </div>
    </>
  )
}

export default NewZealand
