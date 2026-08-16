import { Link, useParams } from 'react-router'

export default function Navbar() {
  const params = useParams()
  const id = params.id

  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-[#c3d5aa] p-1 outline outline-1 outline-[#823c50]">
      <ul className="flex justify-evenly font-['Bellota'] text-2xl">
        <li>
          <Link to={checkLink('', id)}>Home</Link>
        </li>
        <li>
          <Link to={checkLink('timeline', id)}>Timeline</Link>
        </li>
        <li>
          <Link to={checkLink('venue', id)}>Venue</Link>
        </li>
        <li>
          <Link to={checkLink('travel', id)}>Travel</Link>
        </li>
        {/* <li>
          <Link to={checkLink('accommodation', id)}>Accommodation</Link>
        </li> */}
        <li>
          <Link to={checkLink('menu', id)}>Menu</Link>
        </li>
        <li>
          <Link to={checkLink('registry', id)}>Registry</Link>
        </li>
        <li>
          <Link to={checkLink('rsvp', id)}>RSVP</Link>
        </li>
      </ul>
    </div>
  )
}

function checkLink(link: string, id: string | undefined) {
  if (!id) return '/'
  else link = `/${link != '' ? `${link}/` : ''}${id}`
  return link
}
