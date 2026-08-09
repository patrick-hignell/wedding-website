import { ChangeEvent, useEffect, useState } from 'react'
import { Guest, LoginGuests, OptionType } from '../../models/form'
import Timer from './Timer'
import { useLoginGuests } from '../hooks/useLoginGuests'
import { useParams } from 'react-router'
import Select, { SingleValue } from 'react-select'
import TimerWithParty from './TimerWithParty'
import { useGuests } from '../hooks/useGuests'
import { editGuests } from '../apis/guests'

interface Attendace {
  optionsList: OptionType[]
  selectedOptions: OptionType[]
}

export default function Rsvp() {
  const params = useParams()
  const id = params.id
  const [party, setParty] = useState<LoginGuests>()
  const [attendance, SetAttendance] = useState<Attendace>()
  const [formSent, setFormSent] = useState(false)
  const [showUnfilled, setShowUnfilled] = useState(false)

  const { byId: getLoginGuestsById, edit: editLoginGuests } = useLoginGuests({
    enabled: false,
  })
  const { editGuests: editGuests } = useGuests()

  useEffect(() => {
    if (id) {
      console.log
      getLoginGuestsById.mutate(id, {
        onSuccess: (data) => {
          if (!data) {
            window.location.href = '/'
          } else {
            setParty(data)
            initiateAttendance(data)
          }
        },
        onError: () => {
          window.location.href = '/'
        },
      })
    } else {
      window.location.href = '/'
    }
  }, [])

  const bothAttendingOptions: OptionType[] = [
    { value: '', label: 'Please Select' },
    { value: 'Cornwall', label: 'Cornwall' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Both', label: 'Both' },
    { value: 'Neither', label: 'Neither' },
  ]

  const newZealandAttendingOptions: OptionType[] = [
    { value: '', label: 'Please Select' },
    { value: 'New Zealand', label: 'Yes' },
    { value: 'Neither', label: 'No' },
  ]

  const cornwallAttendingOptions: OptionType[] = [
    { value: '', label: 'Please Select' },
    { value: 'Cornwall', label: 'Yes' },
    { value: 'Neither', label: 'No' },
  ]

  function initiateAttendance(party: LoginGuests) {
    if (party) {
      SetAttendance(() => {
        let optionsList: OptionType[] = [...bothAttendingOptions]
        if (party.attending == 'Cornwall') {
          optionsList = [...cornwallAttendingOptions]
        } else if (party.attending == 'New Zealand') {
          optionsList = [...newZealandAttendingOptions]
        }

        const selectedOptions: OptionType[] = party.guests.map((guest) => {
          return (
            optionsList.find((option) => option.value == guest.attending) ??
            optionsList[0]
          )
        })

        return { optionsList, selectedOptions }
      })
    }
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    setParty((prevData) => {
      if (!prevData) return prevData

      const data = structuredClone(prevData)
      data.guests[index].name = e.target.value
      return data
    })
  }

  function handleAttendingChange(e: SingleValue<OptionType>, index: number) {
    SetAttendance((prevData) => {
      if (!prevData) return prevData

      const data = structuredClone(prevData)
      if (e) data.selectedOptions[index] = e
      return data
    })

    if (e)
      setParty((prevData) => {
        if (!prevData) return prevData

        const data = structuredClone(prevData)
        data.guests[index].attending = e.value
        return data
      })
  }

  function handleDietaryChange(
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    setParty((prevData) => {
      if (!prevData) return prevData

      const data = structuredClone(prevData)
      data.guests[index].dietaryRequirements = e.target.value
      return data
    })
  }

  function handleNotesChange(e: ChangeEvent<HTMLInputElement>, index: number) {
    setParty((prevData) => {
      if (!prevData) return prevData

      const data = structuredClone(prevData)
      data.guests[index].notes = e.target.value
      return data
    })
  }

  function handleSubmit() {
    if (checkValidSubmit() && party) {
      editGuests.mutate(party.guests)
      editLoginGuests.mutate(party)
    }
  }

  function checkValidSubmit() {
    const isValid: boolean = party
      ? party.guests.every((guest) => guest.attending != '' && guest.name != '')
      : false

    setShowUnfilled(!isValid)
    return isValid
  }

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
      {party && <TimerWithParty party={party} />}
      <div>
        <p className="mt-16 text-center font-['MonteCarlo'] text-5xl ">
          {`${formSent ? 'The form has been successfully submitted, Thank you!' : 'Please fill out the following for each attendee'}`}
        </p>
      </div>
      <div className="mt-8 flex w-full flex-col items-center">
        {party &&
          party.guests.map((guest, index) => (
            <div
              key={guest.id}
              className={`m-4 flex flex-col gap-4 rounded-lg border border-black ${index % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} w-[90%] bg-opacity-15 p-4 md:w-[50%]`}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="mr-4">
                  Full name (as you wish it to appear on the invitation){' '}
                  <span
                    className={`text-red-500 ${guest.name.length === 0 && showUnfilled ? '' : 'hidden'}`}
                  >
                    * Please fill out
                  </span>
                </label>
                <input
                  className="h-10 w-full rounded border border-black pl-3"
                  type="text"
                  id="name"
                  name="name"
                  value={guest.name}
                  onChange={(e) => handleNameChange(e, index)}
                ></input>
              </div>
              <div className="mb-3 flex flex-col gap-1">
                <label htmlFor="attending" className="mr-4">
                  {party.attending === 'Both'
                    ? 'Which wedding can you attend?'
                    : 'Are you attending?'}{' '}
                  <span
                    className={`text-red-500 ${guest.attending === '' && showUnfilled ? '' : 'hidden'}`}
                  >
                    * Please fill out
                  </span>
                </label>
                <Select
                  className="h-9 w-full rounded"
                  id="attending"
                  name="attending"
                  options={attendance?.optionsList}
                  value={attendance?.selectedOptions[index]}
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
                  id="name"
                  name="name"
                  value={guest.dietaryRequirements}
                  onChange={(e) => handleDietaryChange(e, index)}
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="notes" className="mr-4">
                  Any additional notes?
                </label>
                <input
                  className="h-10 w-full rounded border border-black pl-3"
                  type="text"
                  id="name"
                  name="name"
                  value={guest.notes}
                  onChange={(e) => handleNotesChange(e, index)}
                ></input>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="text-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}
