import { Link, useParams } from 'react-router'

export default function Navbar() {
  const params = useParams()
  const id = params.id
  const venue = params.venue
  const currentUrl: string = window.location.href

  return (
    <div className="fixed left-0 top-0 z-50 w-full bg-[#c3d5aa] p-1 outline outline-1 outline-[#823c50]">
      <ul className="flex justify-evenly font-['Bellota'] text-2xl">
        <li>
          <Link to={checkLink('', id, venue)}>Home</Link>
        </li>
        <li>
          <Link to={checkLink('travel', id, venue)}>Travel</Link>
        </li>
        <li>
          <Link to={checkLink('accommodation', id, venue)}>Accommodation</Link>
        </li>
        <li>
          <Link to={checkLink('menu', id, venue)}>Menu</Link>
        </li>
        <li>
          <Link to={checkLink('timeline', id, venue)}>Timeline</Link>
        </li>
        <li>
          <Link to={checkLink('venue', id, venue)}>Venue</Link>
        </li>
        <li>
          <Link to={checkLink('registry', id, venue)}>Registry</Link>
        </li>
        <li>
          <Link to={checkLink('rsvp', id, venue)}>RSVP</Link>
        </li>
        {venue && currentUrl && (
          <li>
            <Link
              to={currentUrl
                .split('/')
                .slice(0, -1)
                .concat(venue == 'scorrier' ? 'gwavas' : 'scorrier')
                .join('/')}
            >
              Switch Location
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

function checkLink(
  link: string,
  id: string | undefined,
  venue: string | undefined,
) {
  if (!id) return '/'
  else link = `/${link != '' ? `${link}/` : ''}${id}${venue ? `/${venue}` : ''}`
  return link
}
