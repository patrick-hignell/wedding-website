import { Guest } from '../../models/form'
import { useGuests } from '../hooks/useGuests'

function GuestList() {
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
    delete: deleteGuest,
    // add: addGuests,
    // edit: editGuests,
  } = useGuests()

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

  function handleDelete(guest: Guest) {
    deleteGuest.mutate(guest)
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
        Guest List
      </h2>
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
              <td className="cell w-14 text-center">
                <i className="bi bi-x-circle-fill"></i>
              </td>
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
                <td className="cell text-center">
                  <button onClick={() => handleDelete(guest)}>
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                </td>
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

export default GuestList
