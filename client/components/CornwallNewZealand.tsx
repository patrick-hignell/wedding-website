import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TimeRemaining } from '../../models/time'
import { FormData, GuestData, OptionType } from '../../models/form'
import { useParams } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import { getGuestNo, getTimeRemaining } from '../utils/rsvp'
import { useGuests } from '../hooks/useGuests'

function CornwallNewZealand() {
  const {
    // data: guests,
    // isPending,
    // isError,
    // error,
    // delete: deleteGuest,
    add: addGuests,
    // edit: editGuests,
  } = useGuests()
  const blankData: FormData = {
    name: '',
    attending: { value: 'Please Select', label: 'Please Select' },
    dietaryRequirements: '',
    notes: '',
  }
  const params = useParams()
  const guestNo = getGuestNo(params.invites as string)
  const [datePassed, setDatePassed] = useState(true)
  const [formData, setFormData] = useState<FormData[]>(
    new Array(guestNo).fill({ ...blankData }),
  )
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>()
  const arrivalDate: string = new Date(
    '2026-09-26T03:00:00.000Z',
  ).toDateString()
  const secondArrivalDate: string = new Date(
    '2026-10-17T16:00:00.000Z',
  ).toDateString()

  const attendingOptions: OptionType[] = [
    { value: 'Please Select', label: 'Please Select' },
    { value: 'Cornwall', label: 'Cornwall' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Both', label: 'Both' },
    { value: 'Neither', label: 'Neither' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const time =
        datePassed === false
          ? getTimeRemaining(arrivalDate)
          : getTimeRemaining(secondArrivalDate)
      setTimeLeft(time)
      if (
        time.total + time.days + time.hours + time.minutes + time.seconds ===
        0
      ) {
        setDatePassed(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  function handleAttendingChange(e: SingleValue<OptionType>, index: number) {
    // Update the state using a functional update to ensure the latest state is used
    if (e) {
      setFormData((prevData) => {
        const data = prevData
        data[index] = { ...data[index], attending: e }
        return [...data]
      })
    }

    // console.log(formData)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() // Prevents default page reload
    if (formData.some((guest) => guest.attending.value === 'Please Select')) {
      alert('Please choose an option for attending')
    } else if (formData.some((guest) => guest.name.toLowerCase() === 'me')) {
      alert("No Rory, you can't just put 'Me' as your name")
    } else {
      const guestData: GuestData[] = formData.map((guest) => {
        return { ...guest, attending: guest.attending.value }
      })
      addGuests.mutate(guestData)
    }
  }

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
          <form onSubmit={handleSubmit}>
            {formData.map((attendee, index) => (
              <div key={index}>
                <label htmlFor="name">
                  Full name (as you wish it to appear on the invitation)
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData[index].name}
                  onChange={(e) => handleInputChange(e, index)}
                ></input>
                <label htmlFor="attending">Are you attending?</label>
                {/* <input
                  type="checkbox"
                  id="attending"
                  name="attending"
                  checked={formData[index].attending}
                  onChange={(e) => handleCheckboxChange(e, index)}
                ></input> */}
                <Select
                  id="attending"
                  name="attending"
                  options={attendingOptions}
                  value={formData[index].attending}
                  onChange={(e) => handleAttendingChange(e, index)}
                />
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
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  )
}

export default CornwallNewZealand
