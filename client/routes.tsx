import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import Layout from './components/Layout.tsx'
import Cornwall from './components/Cornwall.tsx'
import NewZealand from './components/NewZealand.tsx'
import CornwallNewZealand from './components/CornwallNewZealand.tsx'
export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/cornwall/:invites" element={<Cornwall />} />
    <Route path="/new-zealand/:invites" element={<NewZealand />} />
    <Route
      path="/cornwall-new-zealand/:invites"
      element={<CornwallNewZealand />}
    />
  </Route>,
)
