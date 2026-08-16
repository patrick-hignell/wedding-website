import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'

interface Props {
  party: LoginGuests
}

export default function Menu({ party }: Props) {
  return (
    <div className="mb-28 flex flex-col items-center">
      <Header />
      <p className="mb-6  text-center font-['MonteCarlo'] text-[5rem]  ">
        Menu
      </p>
      {party.attending == 'Cornwall' ? (
        <Oops />
      ) : (
        <div className=" text-center font-['castoro'] text-4xl leading-relaxed tracking-[0.02em]">
          <p>Food provided by Pure Catering</p>
          <p className="underline">
            <a
              href="https://purecatering.co.nz"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.purecatering.co.nz
            </a>
          </p>
          <p>&nbsp;</p>
          <p className="underline">Timings</p>
          <p>4:30pm - Canapes</p>
          <p>6:30pm - Main Meal</p>
          <p>&nbsp;</p>
          <p className="underline">Main Menu</p>
          <p>Stuffed Chicken Breast</p>
          <p className="text-2xl">or</p>
          <p>Roast Lamb</p>
          <p className="text-2xl">with</p>
          <p>Herb and Butter Gourmet Potatoes</p>
          <p className="text-2xl">and</p>
          <p>Greek Salad</p>
          <p>Roast Vegetable Salad</p>
          <p>Pasta Salad</p>
          <p>Broccoli and Bacon Salad</p>
          <p>&nbsp;</p>
          <p>Fresh Baked Artisan Breads</p>
          <p>Condiments and Gravy</p>
          <p>&nbsp;</p>
          <p>Cake</p>
          <p>&nbsp;</p>
          <p>
            Vegan and gluten free options available. Contact us for more
            information!
          </p>
        </div>
      )}
    </div>
  )
}
