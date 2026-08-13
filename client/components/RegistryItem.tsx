import { Registry } from '../../models/registry'

export default function RegistryItem(registryItem: Registry) {
  return (
    <div className="alternating m-4 flex w-[90%] gap-4 rounded-lg border border-black bg-opacity-15 p-4 font-['Bellota'] text-xl  md:w-[50%]">
      <a
        href={`https://${registryItem.link}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className=""
          alt={registryItem.image}
          src={`/images/${registryItem.image}.png`}
          style={{ width: 400, height: 'auto' }}
        />
      </a>
      <div className="flex flex-1 flex-col items-center justify-evenly">
        <p className="text-3xl font-bold">{registryItem.name}</p>
        {registryItem.location && <p>Location: {registryItem.location}</p>}
        {registryItem.bio && <p>{registryItem.bio}</p>}
        {registryItem.cost && <p>${registryItem.cost}</p>}
        {registryItem.link && (
          <a
            href={`https://${registryItem.link}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {registryItem.link}
          </a>
        )}
      </div>
    </div>
  )
}
