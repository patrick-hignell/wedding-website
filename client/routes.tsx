import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
// import Cornwall from './components/Cornwall.tsx'
// import NewZealand from './components/NewZealand.tsx'
// import CornwallNewZealand from './components/CornwallNewZealand.tsx'
import SaveTheDate from './components/SaveTheDate.tsx'
import GuestList from './components/GuestList.tsx'
import Travel from './components/Travel.tsx'
import Accommodation from './components/Accommodation.tsx'
import Menu from './components/Menu.tsx'
import Timeline from './components/Timeline.tsx'
import Venue from './components/Venue.tsx'
import Registry from './components/Registry.tsx'
import LoginAdmin from './components/LoginAdmin.tsx'
import Login from './components/Login.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Login />} />
    <Route path="/guest-list" element={<GuestList />} />
    <Route path="/login-admin" element={<LoginAdmin />} />
    {/* <Route index element={<App />} />
    <Route path="/guest-list" element={<GuestList />} />
    <Route path="/login-admin" element={<LoginAdmin />} />
    <Route path="/:venue" element={<App />} />
    <Route path="/:venue/travel" element={<Travel />} />
    <Route path="/:venue/accommodation" element={<Accommodation />} />
    <Route path="/:venue/menu" element={<Menu />} />
    <Route path="/:venue/timeline" element={<Timeline />} />
    <Route path="/:venue/venue" element={<Venue />} />
    <Route path="/:venue/registry" element={<Registry />} />
    <Route path="/:venue/:invites?" element={<SaveTheDate />} /> */}
    {/* <Route path="/cornwall/:invites?" element={<Cornwall />} />
    <Route path="/new-zealand/:invites?" element={<NewZealand />} />
    <Route
      path="/cornwall-new-zealand/:invites?"
      element={<CornwallNewZealand />}
    /> */}
  </Route>,
)
