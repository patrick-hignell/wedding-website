import { useState } from 'react'
import { Registry, RegistryData } from '../../models/registry'
import { useRegistry } from '../hooks/useRegistry'

export default function RegistryAdmin() {
  // const [registry, setRegistry] = useState<Registry[]>()
  // const [registryEntries, setRegistryEntries] = useState<RegistryEntry[]>()
  const [registryItemData, setRegistryItemData] = useState<RegistryData>({
    name: '',
    location: '',
    bio: '',
    cost: 0,
  })
  const [registryEditItem, setRegistryEditItem] = useState<Registry>({
    id: 0,
    name: '',
    location: '',
    bio: '',
    cost: 0,
  })
  const {
    data: registry,
    isPending,
    isError,
    error,
    delete: deleteRegistry,
    add: addRegistry,
    // edit: editRegistry,
  } = useRegistry()

  function handleDeleteRegistry(registryItem: Registry) {
    deleteRegistry.mutate(registryItem)
  }

  function handleRegistryItemDataChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value, type } = e.target
    setRegistryItemData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  function handleRegistryItemAdd() {
    if (registryItemData.name.length != 0 && !isNaN(registryItemData.cost)) {
      addRegistry.mutate(registryItemData)
    }
  }

  function handleEditSelect(editId: number) {
    if (registry)
      setRegistryEditItem(
        (prev) =>
          registry.find((registryItem) => registryItem.id == editId) ?? prev,
      )
  }

  if (isPending) return <h2>Loading...</h2>
  if (isError) return <h2>{String(error)}</h2>

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-8 text-center font-['MonteCarlo'] text-[3.5rem]">
        Registry
      </h2>
      <table className="mb-8 w-[90%] table-fixed font-['Bellota'] text-2xl">
        <thead>
          <tr className="bg-green-400 bg-opacity-55 font-['MonteCarlo'] text-4xl">
            <td className="cell">ID</td>
            <td className="cell">Name</td>
            <td className="cell">Location</td>
            <td className="cell">Bio</td>
            <td className="cell">Cost</td>
            <td className="cell">Link</td>
            <td className="cell">Image</td>
            <td className="cell w-14 text-center">
              <i className="bi bi-pencil-fill"></i>
            </td>
            <td className="cell w-14 text-center">
              <i className="bi bi-x-circle-fill"></i>
            </td>
          </tr>
        </thead>
        <tbody>
          {registry.map((registryItem) => (
            <tr key={registryItem.id} className="alternating">
              <td className="cell">{registryItem.id}</td>
              <td className="cell">{registryItem.name}</td>
              <td className="cell">{registryItem.location}</td>
              <td className="cell">{registryItem.bio}</td>
              <td className="cell">{registryItem.cost}</td>
              <td className="cell break-all">{registryItem.link}</td>
              <td className="cell">
                <img
                  className=""
                  alt={registryItem.image}
                  src={`/images/${registryItem.image}.png`}
                  style={{ width: 400, height: 'auto' }}
                />
              </td>
              <td className="cell text-center">
                <button onClick={() => handleDeleteRegistry(registryItem)}>
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </td>
              <td className="cell text-center">
                <button onClick={() => handleDeleteRegistry(registryItem)}>
                  <i className="bi bi-x-circle-fill"></i>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <input
                name="name"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <input
                name="location"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <input
                name="bio"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <input
                name="cost"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                inputMode="decimal"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <input
                name="link"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <input
                name="image"
                className="h-10 w-full justify-center rounded border border-black pl-3"
                type="text"
                onChange={handleRegistryItemDataChange}
              ></input>
            </td>
            <td>
              <button className="text-button" onClick={handleRegistryItemAdd}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
