import { Link, useParams } from 'react-router'
import Select, { SingleValue } from 'react-select'
import { useLoginGuests } from '../hooks/useLoginGuests'
import { LoginGuests, OptionType } from '../../models/form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { firstName, selectStyle } from '../utils/main'
import Header from './Header'

export default function Login() {
  const blankOption: OptionType = {
    value: '',
    label: '',
  }
  const nameOptions: OptionType[] = [blankOption]
  const [selectedOption, setSelectedOption] = useState<OptionType>(blankOption)
  const [party, SetParty] = useState<LoginGuests>()
  const navigate = useNavigate()

  const params = useParams()
  const id = params.id

  useEffect(() => {
    if (id) {
      getLoginGuestsById.mutate(id, {
        onSuccess: (data) => {
          SetParty(data)
        },
      })
    }
  }, [id])

  const {
    data: loginGuests,
    isPending,
    isError,
    error,
    // delete: deleteGuest,
    // add: addGuests,
    // edit: editGuests,
    byId: getLoginGuestsById,
  } = useLoginGuests()

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  if (loginGuests) {
    loginGuests.forEach((loginGuest) => {
      nameOptions.push(
        ...loginGuest.guests.map((guest) => ({
          value: guest.loginId ? guest.loginId.toString() : '',
          label: guest.name,
        })),
      )
    })
  }

  function handleOptionChange(e: SingleValue<OptionType>) {
    if (e) setSelectedOption(e)
  }

  function handleContinue() {
    if (selectedOption.value != null && selectedOption.value != '') {
      getLoginGuestsById.mutate(selectedOption.value, {
        onSuccess: (data) => {
          navigate(`/${data.id}`, {})
        },
      })
    }
  }

  function handleNotYou() {
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col items-center">
      <Header invite={true} />

      {!party && (
        <div>
          <div className="flex">
            <p className="font-['georgia'] text-3xl">
              Please select your name to continue -{' '}
            </p>
            <Select
              className="ml-6 h-9 w-48 rounded"
              id="name"
              name="name"
              options={nameOptions}
              value={selectedOption}
              onChange={handleOptionChange}
              styles={selectStyle}
            />
          </div>
          {selectedOption.value != '' && (
            <div className="mt-10 flex w-full justify-center">
              <button className="text-button" onClick={handleContinue}>
                Continue
              </button>
            </div>
          )}
        </div>
      )}

      {party && (
        <div>
          <div className="flex flex-wrap justify-center text-[3.5rem]">
            <h2 className="text-center font-['MonteCarlo']">Welcome</h2>
            {party.guests.map((guest, index, guests) => (
              <div key={guest.id} className="px-3">
                {index == guests.length - 1 && guests.length > 1 && (
                  <span className="pr-6 font-['Imperial_Script']">&</span>
                )}
                <span className="text-center font-['MonteCarlo']">
                  {`${firstName(guest.name)}`}
                </span>
                {index < guests.length - 1 && (
                  <span className="text-center font-['MonteCarlo']">,</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full justify-center">
            <button className="text-button" onClick={handleNotYou}>
              Not you?
            </button>
          </div>
          <div className="mt-10 flex w-full flex-col">
            {party.rsvpReceived == true && (
              <div className="flex flex-col">
                <p className="text-center font-['georgia'] text-[2rem] tracking-[0.135em] ">
                  Thank you for completing your RSVP.
                </p>
                <p className=" text-center font-['georgia'] text-[2rem] tracking-[0.135em] ">
                  You can check it here -
                </p>
              </div>
            )}
            {party.rsvpReceived == false && (
              <div className="flex flex-col">
                <p className="text-center font-['georgia'] text-[2rem] tracking-[0.135em] ">
                  You have not completed your RSVP.
                </p>
                <p className=" text-center font-['georgia'] text-[2rem] tracking-[0.135em] ">
                  Please do so here-
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex w-full justify-center">
            <Link to={checkLink('rsvp', id, '')}>
              <button className="text-button">RSVP</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

function checkLink(
  link: string,
  id: string | undefined,
  venue: string | undefined,
) {
  if (!id) return '/'
  else link = `/${link != '' ? `${link}/` : ''}${id}${venue ? `/${venue}` : ''}`
  return link
}
