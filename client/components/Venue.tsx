import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'

interface Props {
  party: LoginGuests
}

export default function Venue({ party }: Props) {
  return (
    <div className="mb-28 flex flex-col items-center ">
      <Header />
      <p className="mb-6  text-center font-['MonteCarlo'] text-[3rem] md:text-[5rem]  ">
        Venue
      </p>
      {party.attending == 'Cornwall' ? (
        <Oops />
      ) : (
        <div className="max-w-[90%] text-center font-['castoro'] text-2xl tracking-[0.02em] md:max-w-[60%]  md:text-4xl">
          <div className=" mb-6 flex w-full justify-center">
            <img
              className="w-[250px] lg:w-[600px]"
              alt="venue"
              src="/images/GuavasHouseOutline.png"
            />
          </div>
          <p className="underline">GWAVAS GARDEN & HOMESTEAD</p>
          <p>&nbsp;</p>
          <p>State Highway 50, Tikokino, 4274, NZ</p>
          <p>&nbsp;</p>
          <p className="underline">
            <a
              href="https://www.gwavasgarden.co.nz"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.gwavasgarden.co.nz
            </a>
          </p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>
            Gwavas Garden is a beautiful woodland garden, based on the Cornish
            family home of Tregrehan, where Carlyons have lived for 500 years.
          </p>
          <p>&nbsp;</p>
          <p>
            It comprises nine hectares (20 acres) of mainly exotic trees and
            shrubs. The very first plantings were planted by Major Carlyon in
            the 1860s.
          </p>
          <p>&nbsp;</p>
          <p>
            Gwavas Garden is listed as a registered group of historic trees with
            the Royal New Zealand Institute of Horticulture, also as a Garden of
            National Significance by the NZ Garden Trust and it has been
            recognized by the International Dendrology Society with a
            “Distinguished For Merit” award.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas1.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas2.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas3.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas4.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas5.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas6.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas7.png`}
            />
            <img
              className="image-list"
              alt="gwavas garden"
              src={`/images/gwavas8.png`}
            />
          </div>
        </div>
      )}
    </div>
  )
}
