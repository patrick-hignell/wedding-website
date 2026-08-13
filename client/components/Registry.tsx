import { LoginGuests } from '../../models/form'
import { useRegistry } from '../hooks/useRegistry'
import Header from './Header'
import Oops from './Oops'
import RegistryItem from './RegistryItem'

interface Props {
  party: LoginGuests
  venue?: string | undefined
}

// Polynesian Spa - Deluxe romantic package - $ 409 PP ($818 per couple)
// Polynesian Spa - Double dipper deluxe - $ 117.95 pp
// Polynesian Spa - extra massage for leanne

// Prince Gate Hotel - King Room - $1268 ($317 per night)

// Redwoods - Night lights + day walk + glow worms - $95 PP

// Whakarewarewa - village tour, cultural experience, geo trails - $119 PP
// Whakarewarewa - hangi - $53 PP

export default function Registry({ party }: Props) {
  const {
    data: registry,
    isPending,
    isError,
    error,
    // delete: deleteRegistry,
    // add: addRegistry,
    // edit: editRegistry,
  } = useRegistry()

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div className="flex flex-col items-center">
      <Header />
      <p className="m-6 text-center font-['georgia'] text-[2rem] tracking-[0.135em]">
        Registry
      </p>
      <p className="mb-6 font-['Bellota'] text-xl">
        Which activity would you like to contribute towards?
      </p>
      {party.attending == 'Cornwall' && <Oops />}

      {registry.map((registryItem) => (
        <RegistryItem key={registryItem.id} {...registryItem} />
      ))}
    </div>
  )
}
