import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
      <header></header>
      <nav>
        <Navbar />
      </nav>
      <main className="mt-12">
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
