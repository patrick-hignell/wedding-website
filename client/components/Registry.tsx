import { useEffect, useState } from 'react'
import { LoginGuests } from '../../models/form'
import { useRegistry } from '../hooks/useRegistry'
import { useRegistryEntry } from '../hooks/useRegistryEntry'
import Header from './Header'
import Oops from './Oops'
import RegistryItem from './RegistryItem'
import { RegistryWithEntries } from '../../models/registry'
import { RegistryEntry, RegistryEntryData } from '../../models/registryEntry'
import { toCurrency } from '../utils/main'

interface Props {
  party: LoginGuests
  venue?: string | undefined
}

export default function Registry({ party }: Props) {
  const [registryWithEntries, setRegistryWithEntries] = useState<
    RegistryWithEntries[]
  >([])
  const [personalTotal, setPersonalTotal] = useState<number>(0)
  const {
    data: registry,
    isPending,
    isError,
    error,
    // delete: deleteRegistry,
    // add: addRegistry,
    // edit: editRegistry,
  } = useRegistry()

  const {
    data: registryEntry,
    isPending: isPendingEntry,
    isError: isErrorEntry,
    error: errorEntry,
    delete: deleteRegistryEntry,
    add: addRegistryEntry,
    // edit: editRegistry,
  } = useRegistryEntry()

  useEffect(() => {
    if (!registry || !registryEntry) return

    setRegistryWithEntries(
      registry.map((item) => ({
        ...item,
        entries: registryEntry.filter((entry) => entry.registryId === item.id),
      })),
    )
  }, [registry, registryEntry])

  useEffect(() => {
    setPersonalTotal(
      registryWithEntries.reduce((total, current) => {
        return (
          total +
          current.entries.reduce((entryTotal, entryCurrent) => {
            if (entryCurrent.loginId == party.id) {
              return entryTotal + entryCurrent.payment
            }
            return entryTotal
          }, 0)
        )
      }, 0),
    )
  }, [registryWithEntries])
  if (isPending || isPendingEntry) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>
  if (isErrorEntry) return <h2>{String(errorEntry)}</h2>

  function handleContributionAddButton(
    contribution: string,
    registryId: number,
  ) {
    if (!isNaN(Number(contribution))) {
      const newRegistryEntry: RegistryEntryData = {
        payment: Number(contribution),
        loginId: party.id,
        registryId: registryId,
      }
      addRegistryEntry.mutate(newRegistryEntry)
    }
  }

  function handleContributionDeleteButton(entry: RegistryEntry) {
    deleteRegistryEntry.mutate(entry)
  }

  return (
    <div className="mb-28 flex flex-col items-center">
      <Header />
      <p className="mb-6  text-center font-['MonteCarlo'] text-[3rem] md:text-[5rem]">
        Registry
      </p>
      {party.attending == 'Cornwall' ? (
        <Oops />
      ) : (
        <>
          <div className="mb-6 max-w-[80%] text-center font-['georgia'] text-2xl tracking-[0.135em] md:text-4xl lg:max-w-[60%]">
            {personalTotal > 0 ? (
              <div className="flex flex-col gap-2">
                <p>
                  Thank you for your contribution of $
                  {toCurrency(personalTotal)}.
                </p>
                <p>You can send your contribution to bank account:</p>
                <p className="text-3xl md:text-5xl">03-1399-0684380-000</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p>
                  If you would like to contribute towards our mini-moon, you can
                  choose from the activities below and you can send your
                  contribution to bank account:
                </p>
                <p className="text-3xl md:text-5xl">03-1399-0684380-000</p>
              </div>
            )}
          </div>

          {registryWithEntries.map((registryItem) => (
            <RegistryItem
              key={registryItem.id}
              party={party}
              registryItem={registryItem}
              onContributionAddButton={handleContributionAddButton}
              onContributionDeleteButton={handleContributionDeleteButton}
            />
          ))}
        </>
      )}
    </div>
  )
}
