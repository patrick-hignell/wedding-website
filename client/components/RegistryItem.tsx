import { useEffect, useState } from 'react'
import { RegistryWithEntries } from '../../models/registry'
import { RegistryEntry } from '../../models/registryEntry'
import { LoginGuests } from '../../models/form'
import { toCurrency } from '../utils/main'

interface Props {
  registryItem: RegistryWithEntries
  party: LoginGuests
  onContributionAddButton: (contribution: string, registryId: number) => void
  onContributionDeleteButton: (entry: RegistryEntry) => void
}

interface Progress {
  progress: number
  remaining: number
}

export default function RegistryItem({
  registryItem,
  party,
  onContributionAddButton,
  onContributionDeleteButton,
}: Props) {
  const [selected, setSelected] = useState<boolean>(false)
  const [contribution, setContribution] = useState<string>('')
  const [myRegistryEntries, setMyRegistryEntries] = useState<RegistryEntry[]>(
    [],
  )
  const [progress, setProgress] = useState<Progress>()
  useEffect(() => {
    setMyRegistryEntries(
      registryItem.entries.filter((entry) => entry.loginId == party.id),
    )

    checkProgress()
  }, [registryItem])

  function checkProgress() {
    const sumContribution = registryItem.entries.reduce(
      (accumulator, currentItem) => {
        return accumulator + currentItem.payment
      },
      0,
    )

    setProgress(() => {
      return {
        progress: Math.min((sumContribution / registryItem.cost) * 100, 100),
        remaining: registryItem.cost - sumContribution,
      }
    })
  }

  function handleSelectButton() {
    setSelected((prev) => !prev)
  }

  function handleContributionInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setContribution(e.target.value)
  }

  return (
    <div
      className="alternating m-4 flex min-w-[600px] flex-col gap-4 rounded-lg border border-black bg-opacity-15 p-4 font-['Bellota'] text-xl  lg:w-[50%]"
      style={{
        backgroundImage: `linear-gradient(to right, #c3d5aa ${progress?.progress}%, #EDCADC ${progress?.progress}%)`,
      }}
    >
      <div className="flex flex-col gap-2 text-justify xl:flex-row">
        <div className="w-fill flex justify-center">
          <a
            href={`https://${registryItem.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className=" border border-black"
              alt={registryItem.image}
              src={`/images/${registryItem.image}.png`}
              style={{ width: 400, height: 'auto' }}
            />
          </a>
        </div>
        <div className="flex flex-1 flex-col items-center justify-evenly text-center">
          <p className="text-3xl font-bold">{registryItem.name}</p>
          {registryItem.location && <p>Location: {registryItem.location}</p>}
          {registryItem.bio && <p>{registryItem.bio}</p>}
          {registryItem.cost && (
            <p>
              ${registryItem.cost} total ($
              {toCurrency(Math.max(0, progress?.remaining ?? 0))} remaining)
            </p>
          )}
          {/* {registryItem.link && (
            <a
              className="break-all"
              href={`https://${registryItem.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {registryItem.link}
            </a>
          )} */}
        </div>
        {myRegistryEntries.length == 0 && (
          <button onClick={handleSelectButton} className="h-fit">
            <i className="bi bi-plus-square-fill text-3xl"></i>
          </button>
        )}
      </div>
      {myRegistryEntries.map((entry) => (
        <div key={entry.id} className="flex items-center gap-2">
          <p>Thank you for contributing</p>
          <p>${toCurrency(entry.payment)}</p>
          <button onClick={() => onContributionDeleteButton(entry)}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
      ))}
      {selected && myRegistryEntries.length == 0 && (
        <div className="flex flex-col items-center xl:flex-row xl:gap-10">
          <p>How much would you like to contribute?</p>
          <div className="flex flex-1 items-center gap-2 xl:w-full">
            <p>$</p>
            <input
              name="cost"
              className="h-10 w-full justify-center rounded border border-black pl-3 xl:flex-1"
              type="text"
              value={contribution}
              onChange={handleContributionInputChange}
            ></input>
          </div>
          <button
            className="text-button"
            onClick={() =>
              onContributionAddButton(contribution, registryItem.id)
            }
          >
            Submit
          </button>
        </div>
      )}
    </div>
  )
}
