import { useState } from 'react'
import { Guest, Login, OptionType } from '../../models/form'
import { useGuests } from '../hooks/useGuests'
import Select, { SingleValue } from 'react-select'
import { useLogins } from '../hooks/useLogins'

export default function LoginAdmin() {
  const blankOption: OptionType = {
    value: 'Select a guest',
    label: 'Select a guest',
  }

  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])
  const [selectedOption, setSelectedOption] = useState<OptionType>(blankOption)

  const nameOptions: OptionType[] = [blankOption]

  const attendees = {
    totalResponses: 0,
    repliedCornwall: 0,
    repliedNewZealand: 0,
    repliedBoth: 0,
    repliedNeither: 0,
    totalAttendingCornwall: 0,
    totalAttendingNewZealand: 0,
  }
  const {
    data: guests,
    isPending,
    isError,
    error,
    // delete: deleteGuest,
    // add: addGuests,
    // edit: editGuests,
  } = useGuests()

  const {
    data: logins,
    // isPendingLogins,
    // isErrorLogins,
    // errorLogins,
    delete: deleteLogin,
    add: addLogin,
    // edit: editGuests,
  } = useLogins()

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  if (guests) {
    attendees.totalResponses = guests.length
    attendees.repliedCornwall = guests.filter(
      (guest) => guest.attending === 'Cornwall',
    ).length
    attendees.repliedNewZealand = guests.filter(
      (guest) => guest.attending === 'New Zealand',
    ).length
    attendees.repliedBoth = guests.filter(
      (guest) => guest.attending === 'Both',
    ).length
    attendees.repliedNeither = guests.filter(
      (guest) => guest.attending === 'Neither',
    ).length
    attendees.totalAttendingCornwall = guests.filter(
      (guest) => guest.attending === 'Both' || guest.attending === 'Cornwall',
    ).length
    attendees.totalAttendingNewZealand = guests.filter(
      (guest) =>
        guest.attending === 'Both' || guest.attending === 'New Zealand',
    ).length
  }

  if (guests) {
    nameOptions.push(
      ...guests.map((guest) => ({
        value: guest.id.toString(),
        label: guest.name,
      })),
    )
  }

  function handleOptionChange(e: SingleValue<OptionType>) {
    if (e) setSelectedOption(e)
  }

  function handleAddGuest() {
    if (guests) {
      const findGuest: Guest | undefined = guests.find(
        (guest) => guest.id.toString() == selectedOption.value,
      )
      if (findGuest && !selectedGuests.includes(findGuest)) {
        setSelectedGuests((prevData) => [...prevData, findGuest])
        setSelectedOption(blankOption)
      }
    }
  }

  function handleAddLogin() {
    if (selectedGuests.length > 0) {
      addLogin.mutate(selectedGuests)
      setSelectedGuests([])
    }
  }

  function handleDeleteGuest(removeIndex: number) {
    setSelectedGuests((prevData) =>
      prevData.filter((_, index) => index != removeIndex),
    )
  }

  function handleDeleteLogin(login: Login) {
    if (window.confirm(`Are you sure you want to delete login ${login.id}?`)) {
      deleteLogin.mutate(login)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1
        className={`-mb-6 -mt-5 text-center font-['MonteCarlo'] text-[6rem] lg:text-[9rem]`}
      >
        Leanne{' '}
        <span className=" -my-10 block px-4 font-['Imperial_Script'] md:inline">
          &
        </span>{' '}
        Patrick
      </h1>
      <h2 className="mb-8 text-center font-['MonteCarlo'] text-[3.5rem]">
        Login Admin
      </h2>
      {guests && (
        <div className="mb-6 flex w-1/4 justify-evenly font-['Bellota'] text-2xl">
          <Select
            className="h-9 rounded"
            id="name"
            name="name"
            options={nameOptions}
            value={selectedOption}
            onChange={handleOptionChange}
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
          <button
            className="rounded-lg p-1 outline outline-1 outline-black"
            onClick={handleAddGuest}
          >
            Add
          </button>

          <button
            className="rounded-lg p-1 outline outline-1 outline-black"
            onClick={handleAddLogin}
          >
            Get Login
          </button>
        </div>
      )}

      {isPending && <h2 className="font-['Bellota'] text-2xl">Loading...</h2>}
      {isError && (
        <h2 className="font-['Bellota'] text-2xl">{String(error)}</h2>
      )}

      {guests && (
        <table className="mb-8 w-[90%] table-fixed font-['Bellota'] text-2xl">
          <thead>
            <tr className="bg-green-400 bg-opacity-55 font-['MonteCarlo'] text-4xl">
              <td className="cell">ID</td>
              <td className="cell">Name</td>
              <td className="cell">Attending</td>
              <td className="cell">Dietary Requirements</td>
              <td className="cell">Notes</td>
              <td className="cell">Login Id</td>
              <td className="cell w-14 text-center">
                <i className="bi bi-x-circle-fill"></i>
              </td>
            </tr>
          </thead>
          <tbody>
            {selectedGuests.map((guest, index) => (
              <tr
                key={guest.id}
                className={`${index % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} bg-opacity-35`}
              >
                <td className="cell">{guest.id}</td>
                <td className="cell">{guest.name}</td>
                <td className="cell">{guest.attending}</td>
                <td className="cell">{guest.dietaryRequirements}</td>
                <td className="cell">{guest.notes}</td>
                <td className="cell">{guest.loginId}</td>
                <td className="cell text-center">
                  <button onClick={() => handleDeleteGuest(index)}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="mb-8 text-center font-['MonteCarlo'] text-[3.5rem]">
        Logins
      </h2>

      {logins && (
        <table className="mb-8 w-[90%] table-fixed font-['Bellota'] text-2xl">
          <thead>
            <tr className="bg-green-400 bg-opacity-55 font-['MonteCarlo'] text-4xl">
              <td className="cell">ID</td>
              <td className="cell">RSVP Received</td>
              <td className="cell">Attending</td>
              <td className="cell w-14 text-center">
                <i className="bi bi-x-circle-fill"></i>
              </td>
            </tr>
          </thead>
          <tbody>
            {logins.map((login, index) => (
              <tr
                key={login.id}
                className={`${index % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} bg-opacity-35`}
              >
                <td className="cell">{login.id}</td>
                <td className="cell">{login.rsvpReceived ? 'Yes' : 'no'}</td>
                <td className="cell">{login.attending}</td>
                <td className="cell text-center">
                  <button onClick={() => handleDeleteLogin(login)}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="mb-8 text-center font-['MonteCarlo'] text-[3.5rem]">
        Guest List
      </h2>

      {guests && (
        <table className="mb-8 w-[90%] table-fixed font-['Bellota'] text-2xl">
          <thead>
            <tr className="bg-green-400 bg-opacity-55 font-['MonteCarlo'] text-4xl">
              <td className="cell">ID</td>
              <td className="cell">Name</td>
              <td className="cell">Attending</td>
              <td className="cell">Dietary Requirements</td>
              <td className="cell">Notes</td>
              <td className="cell">Login Id</td>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <tr
                key={guest.id}
                className={`${index % 2 === 0 ? 'bg-pink-300' : 'bg-green-300'} bg-opacity-35`}
              >
                <td className="cell">{guest.id}</td>
                <td className="cell">{guest.name}</td>
                <td className="cell">{guest.attending}</td>
                <td className="cell">{guest.dietaryRequirements}</td>
                <td className="cell">{guest.notes}</td>
                <td className="cell">{guest.loginId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mb-8 font-['Bellota'] text-2xl">
        <p>Total Responses: {attendees.totalResponses}</p>
        <p>Total Replied Cornwall: {attendees.repliedCornwall}</p>
        <p>Total Replied New Zealand: {attendees.repliedNewZealand}</p>
        <p>Total Replied Both: {attendees.repliedBoth}</p>
        <p>Total Replied Neither: {attendees.repliedNeither}</p>
        <p>Total Attending Cornwall: {attendees.totalAttendingCornwall}</p>
        <p>Total Attending New Zealand: {attendees.totalAttendingNewZealand}</p>
      </div>
    </div>
  )
}
