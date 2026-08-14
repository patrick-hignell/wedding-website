import { useEffect, useState } from 'react'
import { LoginGuests } from '../../models/form'
import { useRegistry } from '../hooks/useRegistry'
import { useRegistryEntry } from '../hooks/useRegistryEntry'
import Header from './Header'
import Oops from './Oops'
import RegistryItem from './RegistryItem'
import { RegistryWithEntries } from '../../models/registry'
import { RegistryEntry, RegistryEntryData } from '../../models/registryEntry'

interface Props {
  party: LoginGuests
  venue?: string | undefined
}

export default function Registry({ party }: Props) {
  const [registryWithEntries, setRegistryWithEntries] = useState<
    RegistryWithEntries[]
  >([])
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

  if (isPending || isPendingEntry) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>
  if (isErrorEntry) return <h2>{String(errorEntry)}</h2>

  function handleContributionAddButton(
    contribution: number,
    registryId: number,
  ) {
    const newRegistryEntry: RegistryEntryData = {
      payment: contribution,
      loginId: party.id,
      registryId: registryId,
    }
    addRegistryEntry.mutate(newRegistryEntry)
  }

  function handleContributionDeleteButton(entry: RegistryEntry) {
    deleteRegistryEntry.mutate(entry)
  }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <p className="m-6 text-center font-['georgia'] text-[2rem] tracking-[0.135em]">
        Registry
      </p>
      <p className="mb-6 font-['Bellota'] text-2xl">
        Which activity would you like to contribute towards?
      </p>
      {party.attending == 'Cornwall' && <Oops />}

      {registryWithEntries.map((registryItem) => (
        <RegistryItem
          key={registryItem.id}
          party={party}
          registryItem={registryItem}
          onContributionAddButton={handleContributionAddButton}
          onContributionDeleteButton={handleContributionDeleteButton}
        />
      ))}
    </div>
  )
}
