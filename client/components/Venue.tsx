import { LoginGuests } from '../../models/form'
import Carousel from './Carousel'
import Header from './Header'
import Oops from './Oops'

interface Props {
  party: LoginGuests
}

export default function Venue({ party }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <p className="mb-6  text-center font-['MonteCarlo'] text-[5rem]  ">
        Venue
      </p>
      {party.attending != 'Cornwall' ? (
        <div className="mb-6 max-w-[60%] text-center font-['georgia'] text-4xl  tracking-[0.135em]">
          <p>Gwavas House</p>
          <div className="flex w-full justify-center">
            <img
              alt="venue"
              src="/images/GuavasHouseOutline.png"
              style={{ width: 600, height: 'auto' }}
            />
          </div>
          <p>Gwavas Garden & Homestead</p>
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
          <div
            className="flex justify-center"
            style={{ width: '100%', height: '500px' }}
          >
            <iframe
              title="gwavas"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.3990147651234!2d176.48608071239065!3d-39.7755999714312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d69e5afa3c539df%3A0xc1aad0bec1f066c6!2sGwavas%20Garden%20Homestead!5e0!3m2!1sen!2snz!4v1786827512070!5m2!1sen!2snz"
              width="600"
              height="450"
              style={{ border: '0' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <p>&nbsp;</p>
          <Carousel
            images={[
              'gwavas1.png',
              'gwavas2.png',
              'gwavas3.png',
              'gwavas4.png',
              'gwavas5.png',
              'gwavas6.png',
              'gwavas7.png',
              'gwavas8.png',
            ]}
          />
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
        </div>
      ) : (
        <Oops />
      )}
    </div>
  )
}
