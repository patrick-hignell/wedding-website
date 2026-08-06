import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Border from './Border'

export default function Layout() {
  return (
    <>
      <header></header>
      <nav>
        <Navbar />
      </nav>
      <main className="mt-12">
        <Outlet />
        <Border />
      </main>
      <footer></footer>
    </>
  )
}
