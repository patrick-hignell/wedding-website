import { createRoutesFromElements, Route } from 'react-router'
import Layout from './components/Layout.tsx'
import GuestList from './components/GuestList.tsx'
import Travel from './components/Travel.tsx'
import Accommodation from './components/Accommodation.tsx'
import Menu from './components/Menu.tsx'
import Timeline from './components/Timeline.tsx'
import Venue from './components/Venue.tsx'
import Registry from './components/Registry.tsx'
import LoginAdmin from './components/LoginAdmin.tsx'
import Login from './components/Login.tsx'
import Reroute from './components/Reroute.tsx'
import Rsvp from './components/Rsvp.tsx'
import WithParty from './components/WithParty.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Login />} />
    <Route path="/guest-list" element={<GuestList />} />
    <Route path="/login-admin" element={<LoginAdmin />} />
    <Route path="/cornwall/:invites?" element={<Reroute />} />
    <Route path="/new-zealand/:invites?" element={<Reroute />} />
    <Route path="/cornwall-new-zealand/:invites?" element={<Reroute />} />

    <Route
      path="/travel/:id/:venue?"
      element={<WithParty component={Travel} />}
    />
    <Route
      path="/accommodation/:id/:venue?"
      element={<WithParty component={Accommodation} />}
    />
    <Route path="/menu/:id/:venue?" element={<WithParty component={Menu} />} />
    <Route
      path="/timeline/:id/:venue?"
      element={<WithParty component={Timeline} />}
    />
    <Route
      path="/venue/:id/:venue?"
      element={<WithParty component={Venue} />}
    />
    <Route
      path="/registry/:id/:venue?"
      element={<WithParty component={Registry} />}
    />
    <Route path="/rsvp/:id/:venue?" element={<Rsvp />} />

    <Route path="/:id/:venue?" element={<Login />} />
  </Route>,
)
