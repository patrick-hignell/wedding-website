import { useParams } from 'react-router'
import Select, { SingleValue } from 'react-select'
import { useLoginGuests } from '../hooks/useLoginGuests'
import { LoginGuests, OptionType } from '../../models/form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { firstName } from '../utils/main'
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
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  borderWidth: '1px',
                  borderColor: '#823c50',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: '#823c50', // Set your desired color
                }),
              }}
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
          <div className="flex justify-center">
            <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
              Welcome
            </h2>
            {party.guests.map((guest, index, guests) => (
              <div key={guest.id}>
                {index == guests.length - 1 && guests.length > 1 && (
                  <span className="whitespace-pre-wrap font-['Imperial_Script'] text-[3.5rem]">
                    {'  '}&{' '}
                  </span>
                )}
                {index < guests.length - 1 && index > 0 && (
                  <span className="whitespace-pre-wrap text-center font-['MonteCarlo'] text-[3.5rem]">
                    {'  '},
                  </span>
                )}
                <span className="whitespace-pre-wrap text-center font-['MonteCarlo'] text-[3.5rem]">
                  {` ${firstName(guest.name)}`}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex w-full justify-center">
            <button className="text-button" onClick={handleNotYou}>
              Not you?
            </button>
          </div>
          <div className="flex w-full flex-col">
            {party.rsvpReceived == true && (
              <p className="my-20 text-center font-['georgia'] text-[2rem] tracking-[0.135em] ">
                Thank you for completing your RSVP
              </p>
            )}
            {party.rsvpReceived == false && (
              <p className="my-20 text-center font-['georgia'] text-[2rem] tracking-[0.135em]">
                You have not completed your RSVP
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
