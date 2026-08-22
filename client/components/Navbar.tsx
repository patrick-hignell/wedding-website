import { Link, useParams } from 'react-router'

export default function Navbar() {
  const params = useParams()
  const id = params.id

  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-[#823c50] p-1 text-[#efdfe3] outline outline-1 outline-black">
      {/* className="fixed left-0 top-0 z-50 w-full bg-[#c3d5aa] p-1 outline outline-1 outline-[#823c50]" */}
      <div className="mx-6 flex flex-wrap justify-evenly gap-x-6 font-['Bellota'] md:text-2xl ">
        <p>
          <Link to={checkLink('', id)}>Home</Link>
        </p>
        <p>
          <Link to={checkLink('timeline', id)}>Timeline</Link>
        </p>
        <p>
          <Link to={checkLink('venue', id)}>Venue</Link>
        </p>
        <p>
          <Link to={checkLink('travel', id)}>Travel</Link>
        </p>
        {/* <li>
          <Link to={checkLink('accommodation', id)}>Accommodation</Link>
        </li> */}
        <p>
          <Link to={checkLink('menu', id)}>Menu</Link>
        </p>
        <p>
          <Link to={checkLink('registry', id)}>Registry</Link>
        </p>
        <p>
          <Link to={checkLink('rsvp', id)}>RSVP</Link>
        </p>
      </div>
    </div>
  )
}

function checkLink(link: string, id: string | undefined) {
  if (!id) return '/'
  else link = `/${link != '' ? `${link}/` : ''}${id}`
  return link
}
