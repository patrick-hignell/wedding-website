import { ChangeEvent, useEffect, useState } from 'react'
import {
  Guest,
  GuestWithRsvpInvite,
  Login,
  OptionType,
} from '../../models/form'
import { useGuests } from '../hooks/useGuests'
import Select, { SingleValue } from 'react-select'
import { useLogins } from '../hooks/useLogins'
import { selectStyle } from '../utils/main'

interface Attendees {
  totalResponses: number
  repliedCornwall: number
  repliedNewZealand: number
  repliedBoth: number
  repliedNeither: number
  totalAttendingCornwall: number
  totalAttendingNewZealand: number
}

export default function LoginAdmin() {
  const blankOption: OptionType = {
    value: 'Select a guest',
    label: 'Select a guest',
  }

  const venueOptions: OptionType[] = [
    { value: 'Select a venue', label: 'Select a venue' },
    { value: 'Cornwall', label: 'Cornwall' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Both', label: 'Both' },
  ]

  const rsvpOptions: OptionType[] = [
    { value: 'All', label: 'All' },
    { value: 'True', label: 'RSVP received' },
    { value: 'False', label: 'RSVP outstanding' },
  ]

  const filterVenueOptions: OptionType[] = [
    { value: 'Either', label: 'Either' },
    { value: 'Cornwall', label: 'Cornwall' },
    { value: 'New Zealand', label: 'New Zealand' },
  ]

  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([])
  const [selectedOption, setSelectedOption] = useState<OptionType>(blankOption)
  const [selectedVenue, setSelectedVenue] = useState<OptionType>(
    venueOptions[0],
  )
  const [SelectedRSVPRecieved, setSelectedRSVPRecieved] = useState(false)
  const [guestsWithRsvpInvite, setGuestsWithRsvpInvite] = useState<
    GuestWithRsvpInvite[]
  >([])
  const [createName, setCreateName] = useState<string>()
  const [filter, setFilter] = useState<OptionType[]>([
    { value: 'All', label: 'All' },
    { value: 'Either', label: 'Either' },
    { value: 'Either', label: 'Either' },
  ])
  const [attendees, setAttendees] = useState<Attendees>({
    totalResponses: 0,
    repliedCornwall: 0,
    repliedNewZealand: 0,
    repliedBoth: 0,
    repliedNeither: 0,
    totalAttendingCornwall: 0,
    totalAttendingNewZealand: 0,
  })

  const nameOptions: OptionType[] = [blankOption]

  const {
    data: guests,
    isPending,
    isError,
    error,
    // delete: deleteGuest,
    add: addGuests,
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

  useEffect(() => {
    if (logins && guests) {
      let filteredGuests = guests.map((guest) => {
        const guestLogin = logins.find((login) => login.id == guest.loginId)
        let rsvpReceived = false
        let invitedTo = ''
        if (guestLogin) {
          rsvpReceived = guestLogin.rsvpReceived
          invitedTo = guestLogin.attending
        }
        return { ...guest, rsvpReceived, invitedTo }
      })

      newAttendees(filteredGuests)

      if (filter[0].value != 'All') {
        filteredGuests = filteredGuests.filter(
          (guest) => guest.rsvpReceived == (filter[0].value == 'True'),
        )
      }

      if (filter[1].value == 'New Zealand' || filter[1].value == 'Cornwall') {
        filteredGuests = filteredGuests.filter(
          (guest) =>
            guest.invitedTo == 'Both' || guest.invitedTo == filter[1].value,
        )
      }

      if (filter[2].value == 'New Zealand' || filter[2].value == 'Cornwall') {
        filteredGuests = filteredGuests.filter(
          (guest) =>
            guest.attending == 'Both' || guest.attending == filter[2].value,
        )
      }
      setGuestsWithRsvpInvite(filteredGuests)
    }
  }, [logins, guests, filter])

  function newAttendees(filteredGuests: GuestWithRsvpInvite[]) {
    const newAttendees: Attendees = {
      totalResponses: 0,
      repliedCornwall: 0,
      repliedNewZealand: 0,
      repliedBoth: 0,
      repliedNeither: 0,
      totalAttendingCornwall: 0,
      totalAttendingNewZealand: 0,
    }
    filteredGuests.forEach((guest) => {
      if (guest.rsvpReceived) newAttendees.totalResponses++
      if (guest.attending == 'New Zealand') newAttendees.repliedNewZealand++
      if (guest.attending == 'Cornwall') newAttendees.repliedCornwall++
      if (guest.attending == 'Both') newAttendees.repliedBoth++
      if (guest.attending == 'Neither') newAttendees.repliedNeither++
    })

    newAttendees.totalAttendingCornwall =
      newAttendees.repliedCornwall + newAttendees.repliedBoth
    newAttendees.totalAttendingNewZealand =
      newAttendees.repliedNewZealand + newAttendees.repliedBoth

    setAttendees(newAttendees)
  }

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

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

  function handleVenueChange(e: SingleValue<OptionType>) {
    if (e) setSelectedVenue(e)
  }

  function handleRSVPChange(e: ChangeEvent<HTMLInputElement>) {
    if (e) setSelectedRSVPRecieved(e.target.checked)
  }

  function handleFilterChange(e: SingleValue<OptionType>, filterInt: number) {
    if (e)
      setFilter((prevData) => {
        const data = structuredClone(prevData)

        data[filterInt] = e

        return data
      })
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
    if (selectedGuests.length > 0 && selectedVenue.value != 'Select a venue') {
      const newLoginGuests = {
        rsvpReceived: SelectedRSVPRecieved,
        attending: selectedVenue.value,
        guests: selectedGuests,
      }
      addLogin.mutate(newLoginGuests)
      setSelectedGuests([])
      setSelectedVenue(venueOptions[0])
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

  function createNameChange(e: ChangeEvent<HTMLInputElement>) {
    setCreateName(e.target.value)
  }

  function handleCreateGuest() {
    if (createName)
      addGuests.mutate([
        { name: createName, attending: '', notes: '', dietaryRequirements: '' },
      ])
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
        <div className="mb-6 flex w-1/2 items-center justify-evenly font-['Bellota'] text-2xl">
          <Select
            className="h-9 w-64 rounded"
            id="name"
            name="name"
            options={nameOptions}
            value={selectedOption}
            onChange={handleOptionChange}
            styles={selectStyle}
          />
          <button className="text-button" onClick={handleAddGuest}>
            Add
          </button>

          <Select
            className="h-9 w-64 rounded"
            id="venue"
            name="venue"
            options={venueOptions}
            value={selectedVenue}
            onChange={handleVenueChange}
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

          <p>RSVP recieved: </p>

          <input
            className="h-6 w-6"
            type="checkbox"
            checked={SelectedRSVPRecieved}
            onChange={handleRSVPChange}
          />

          <button className="text-button" onClick={handleAddLogin}>
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
            <tr className="table-header font-['MonteCarlo'] text-4xl">
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
              <tr key={guest.id} className={'alternating'}>
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
            <tr className="table-header font-['MonteCarlo'] text-4xl">
              <td className="cell">ID</td>
              <td className="cell">RSVP Received</td>
              <td className="cell">Invited To</td>
              <td className="cell w-14 text-center">
                <i className="bi bi-x-circle-fill"></i>
              </td>
            </tr>
          </thead>
          <tbody>
            {logins.map((login) => (
              <tr key={login.id} className="alternating">
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
      <div className="mb-8 flex items-center gap-12">
        <p>RSVP:</p>
        <Select
          className="h-9 w-64 rounded"
          id="filterRsvp"
          name="filterRsvp"
          options={rsvpOptions}
          value={filter[0]}
          onChange={(e) => handleFilterChange(e, 0)}
          styles={selectStyle}
        />
        <p>Invited to:</p>
        <Select
          className="h-9 w-64 rounded"
          id="filterInvitedTo"
          name="filterInvitedTo"
          options={filterVenueOptions}
          value={filter[1]}
          onChange={(e) => handleFilterChange(e, 1)}
          styles={selectStyle}
        />
        <p>Attending:</p>
        <Select
          className="h-9 w-64 rounded"
          id="filterAttending"
          name="filterAttending"
          options={filterVenueOptions}
          value={filter[2]}
          onChange={(e) => handleFilterChange(e, 2)}
          styles={selectStyle}
        />
      </div>
      {guests && (
        <table className="mb-8 w-[90%] table-fixed font-['Bellota'] text-2xl">
          <thead>
            <tr className="table-header font-['MonteCarlo'] text-4xl">
              <td className="cell">ID</td>
              <td className="cell">Name</td>
              <td className="cell">RSVP Received</td>
              <td className="cell">Invited to</td>
              <td className="cell">Attending</td>
              <td className="cell">Dietary Requirements</td>
              <td className="cell">Notes</td>
              <td className="cell">Login Id</td>
            </tr>
          </thead>
          <tbody>
            {guestsWithRsvpInvite.map((guest) => (
              <tr key={guest.id} className="alternating">
                <td className="cell">{guest.id}</td>
                <td className="cell">{guest.name}</td>
                <td className="cell">{guest.rsvpReceived ? 'Yes' : 'No'}</td>
                <td className="cell">{guest.invitedTo}</td>
                <td className="cell">{guest.attending}</td>
                <td className="cell">{guest.dietaryRequirements}</td>
                <td className="cell">{guest.notes}</td>
                <td className="cell">{guest.loginId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex items-center">
        <input
          className="h-10 w-full justify-center rounded border border-black pl-3"
          type="text"
          value={createName}
          onChange={(e) => createNameChange(e)}
        ></input>
        <button className="text-button" onClick={handleCreateGuest}>
          Add
        </button>
      </div>
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
