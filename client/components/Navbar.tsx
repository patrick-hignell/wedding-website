import { Link, useParams } from 'react-router'

export default function Navbar() {
  const params = useParams()
  // const venue =
  //   params.venue === 'cornwall-new-zealand'
  //     ? 'Both'
  //     : params.venue === 'new-zealand'
  //       ? 'New Zealand'
  //       : 'Cornwall'
  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-white p-1 outline outline-1 outline-black">
      <ul className="flex justify-evenly font-['Bellota'] text-2xl">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/travel`}>Travel</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/accommodation`}>Accommodation</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/menu`}>Menu</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/timeline`}>Timeline</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/venue`}>Venue</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/registry`}>Registry</Link>
        </li>
        <li>
          <Link to={`/${params.venue}/timeline`}>Timeline</Link>
        </li>
        <li>
          <Link
            to={`/${params.venue}${params.invites != null ? `/${params.invites}` : '/onan'}`}
          >
            RSVP
          </Link>
        </li>
      </ul>
    </div>
  )
}
