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
    <div>
      <ul>
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
            to={`/${params.venue}${params.invites != null ? `/${params.invites}` : ''}`}
          >
            RSVP
          </Link>
        </li>
      </ul>
    </div>
  )
}
