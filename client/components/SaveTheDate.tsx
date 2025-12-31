import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TimeRemaining } from '../../models/time'
import { FormData, GuestData, OptionType } from '../../models/form'
import { useParams } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import { getGuestNo, getTimeRemaining } from '../utils/rsvp'
import { useGuests } from '../hooks/useGuests'
import VenueDetails from './VenueDetails'

function SaveTheDate() {
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
  const venue =
    params.venue === 'cornwall-new-zealand'
      ? 'Both'
      : params.venue === 'new-zealand'
        ? 'New Zealand'
        : 'Cornwall'
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

  const bothAttendingOptions: OptionType[] = [
    { value: 'Please Select', label: 'Please Select' },
    { value: 'Cornwall', label: 'Cornwall' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Both', label: 'Both' },
    { value: 'Neither', label: 'Neither' },
  ]

  const newZealandAttendingOptions: OptionType[] = [
    { value: 'Please Select', label: 'Please Select' },
    { value: 'Cornwall', label: 'Yes' },
    { value: 'Neither', label: 'No' },
  ]

  const cornwallAttendingOptions: OptionType[] = [
    { value: 'Please Select', label: 'Please Select' },
    { value: 'Cornwall', label: 'Yes' },
    { value: 'Neither', label: 'No' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
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
      alert('Please choose an option for attending for each guest')
    } else if (formData.some((guest) => guest.name.toLowerCase() === 'me')) {
      alert("No Rory, you can't just put 'Me' as your name")
    } else {
      const guestData: GuestData[] = formData.map((guest) => {
        return { ...guest, attending: guest.attending.value }
      })
      addGuests.mutate(guestData)
      alert('Thank you, the form has been successfully submitted')
      setFormData(new Array(guestNo).fill({ ...blankData }))
    }
  }

  return (
    <>
      <div className="">
        {
          //Edu_NSW_ACT_Cursive Square_Peg Edu_AU_VIC_WA_NT_Pre Caveat Bellota Playwrite_NZ Playwrite_US_Trad Imperial_Script Mea_Culpa Monsieur_La_Doulaise Rouge_Script Tangerine Alex_Brush Dancing_Script Kapakana MonteCarlo Parisienne Petit_Formal_Script Pinyon_Script WindSong
        }
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
        {timeLeft && (
          <p className="pt-10 text-center font-['MonteCarlo'] text-5xl tracking-wide sm:text-6xl md:text-8xl">
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
        <div className="flex flex-col items-center justify-evenly font-['Bellota'] text-2xl md:flex-row md:items-end">
          {venue !== 'Cornwall' && (
            <VenueDetails
              imageSrc="/images/GuavasHouse.png"
              imageAlt="Guava's house"
              date="26/09/26"
              venue="Gwavas Garden & Homestead"
              address="State Highway 50, Tikokino, 4274"
              country="New Zealand"
              arrivalTime="3pm"
              ceremonyTime="3.30pm"
              endTime="Midnight"
            />
          )}
          {venue !== 'New Zealand' && (
            <VenueDetails
              imageSrc="/images/ScorrierHouse7.png"
              imageAlt="Scorrier house"
              date="17/10/26"
              venue="Scorrier House"
              address="Scorrier, Redruth, Cornwall, TR16 5AU"
              country="England"
              arrivalTime="3pm"
              ceremonyTime="3.30pm"
              endTime="Midnight"
            />
          )}
        </div>
        <p className="mt-16 text-center font-['MonteCarlo'] text-5xl ">
          Please fill out the following for each attendee
        </p>
        <div className="m-auto flex w-[95%] max-w-[1300px] flex-col gap-4 font-['Bellota'] text-2xl">
          {formData && (
            <form onSubmit={handleSubmit}>
              {formData.map((attendee, index) => (
                <div
                  key={index}
                  className={`m-4 flex flex-col gap-4 rounded-lg border border-black ${index % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} bg-opacity-15 p-4`}
                >
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="mr-4">
                      Full name (as you wish it to appear on the invitation)
                    </label>
                    <input
                      className="h-10 w-full rounded border border-black pl-3"
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData[index].name}
                      onChange={(e) => handleInputChange(e, index)}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="attending" className="mr-4">
                      {venue === 'Both'
                        ? 'Which wedding can you attend?'
                        : 'Are you attending?'}
                    </label>
                    <Select
                      className="h-9 w-full rounded"
                      id="attending"
                      name="attending"
                      options={
                        venue === 'Both'
                          ? bothAttendingOptions
                          : venue === 'New Zealand'
                            ? newZealandAttendingOptions
                            : cornwallAttendingOptions
                      }
                      value={formData[index].attending}
                      onChange={(e) => handleAttendingChange(e, index)}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderWidth: '1px',
                          borderColor: 'black',
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: 'black', // Set your desired color
                        }),
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="dietaryRequirements" className="mr-4">
                      Any dietary requirements?
                    </label>
                    <input
                      className="h-10 w-full rounded border border-black pl-3"
                      type="text"
                      id="dietaryRequirements"
                      name="dietaryRequirements"
                      value={formData[index].dietaryRequirements}
                      onChange={(e) => handleInputChange(e, index)}
                    ></input>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="notes" className="mr-4">
                      Any additional notes?
                    </label>
                    <input
                      className="h-10 w-full rounded border border-black pl-3"
                      type="text"
                      id="notes"
                      name="notes"
                      value={formData[index].notes}
                      onChange={(e) => handleInputChange(e, index)}
                    ></input>
                  </div>
                </div>
              ))}
              <div
                className={`m-auto mb-6 flex w-fit justify-center rounded-lg border border-black ${formData.length % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} bg-opacity-15 font-['MonteCarlo']`}
              >
                <button
                  type="submit"
                  className="ml-12 mr-12 mt-2 text-center text-5xl"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default SaveTheDate
