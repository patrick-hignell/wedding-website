import { useParams } from 'react-router'
import Select, { SingleValue } from 'react-select'
import { useLoginGuests } from '../hooks/useLoginGuests'
import { OptionType } from '../../models/form'
import { useState } from 'react'

export default function Login() {
  const blankOption: OptionType = {
    value: 'Select a guest',
    label: 'Select a guest',
  }
  const nameOptions: OptionType[] = [blankOption]
  const [selectedOption, setSelectedOption] = useState<OptionType>(blankOption)

  const params = useParams()

  const {
    data: loginGuests,
    isPending,
    isError,
    error,
    // delete: deleteGuest,
    // add: addGuests,
    // edit: editGuests,
  } = useLoginGuests()

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  if (loginGuests) {
    loginGuests.forEach((loginGuest) => {
      nameOptions.push(
        ...loginGuest.guests.map((guest) => ({
          value: guest.id.toString(),
          label: guest.name,
        })),
      )
    })
  }

  function handleOptionChange(e: SingleValue<OptionType>) {
    if (e) setSelectedOption(e)
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
      <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
        invite you to their wedding celebration
      </h2>
      <div className="flex">
        <p className="font-['Bellota'] text-2xl">Please select your name - </p>
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
              borderColor: 'black',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black', // Set your desired color
            }),
          }}
        />
      </div>
    </div>
  )
}
