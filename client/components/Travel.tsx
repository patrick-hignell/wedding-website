import { LoginGuests } from '../../models/form'
import Header from './Header'
import Oops from './Oops'

interface Props {
  party: LoginGuests
}

export default function Travel({ party }: Props) {
  return (
    <div className="mb-28 flex flex-col items-center">
      <Header />
      <p className="mb-6   text-center font-['MonteCarlo'] text-[3rem] md:text-[5rem] ">
        Travel
      </p>
      {party.attending == 'Cornwall' ? (
        <Oops />
      ) : (
        <div className="flex w-[90%] flex-col items-center gap-12 lg:w-[50%] xl:w-[60%]">
          {/* <div className="flex flex-col-reverse items-center xl:flex-row xl:items-start">
            <div className="h-[400px] shrink-0 items-center justify-center xl:h-[600px]">
              <img
                className="h-full w-full  object-cover"
                alt="map"
                src="/images/mapTransparent.png"
              />
            </div>
            <div className="w-[300px] shrink-0 items-center justify-center xl:h-[300px] xl:w-auto">
              <img
                className="h-full w-full object-cover"
                alt="map"
                src="/images/mapTransparent2.png"
              />
            </div>
          </div> */}
          <img
            className="w-[300px] outline outline-black sm:w-[500px] md:w-[450px] lg:w-[600px] xl:w-[800px]"
            alt="map"
            src="/images/mapBoth.png"
          />
          <div className=" text-center font-['castoro'] text-2xl tracking-[0.02em] md:text-4xl">
            <p className="underline">GWAVAS GARDEN & HOMESTEAD</p>
            <p>&nbsp;</p>
            <p>State Highway 50, Tikokino, 4274, NZ</p>
            <div
              className="mt-12 flex justify-center"
              style={{ width: '100%', height: '500px' }}
            >
              <iframe
                className="travel-map"
                title="gwavas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3066.3990147651234!2d176.48608071239065!3d-39.7755999714312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d69e5afa3c539df%3A0xc1aad0bec1f066c6!2sGwavas%20Garden%20Homestead!5e0!3m2!1sen!2snz!4v1786827512070!5m2!1sen!2snz"
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <p>
              <span className="font-bold">From Napier:</span> Take the
              expressway south and at the first roundabout take the third exit
              (right) onto Links Rd, signed as Highway 50, then turn left at the
              T intersection, follow this road until just past Fernhill and turn
              right following the sign marked Highway 50 to Tikokino. Travel on
              Highway 50 for just under half an hour. Once you have crossed 3
              one way bridges we are just over 2 km south of the last one way
              bridge on the right. Rapid number 5740.
            </p>
            <p>&nbsp;</p>
            <p>
              <span className="font-bold">From Hastings:</span> Take Maraekakaho
              Road south out of Hastings, turn right at the first roundabout and
              follow signs towards Tikokino for about half an hour, once you
              have crossed 3 one way bridges we are just over 2km south of the
              last one way bridge on the right. Rapid number 5740.
            </p>
            <p>&nbsp;</p>
            <p>
              <span className="font-bold">From South:</span> Turn off onto
              Highway 50 just before Takapau and travel for about 20 minutes, we
              are approximately 6 km north of Tikokino on the left. Rapid number
              5740.
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className="underline">SAWYERS ARMS</p>
            <div
              className="mt-12 flex justify-center"
              style={{ width: '100%', height: '500px' }}
            >
              <iframe
                className="travel-map"
                title="sawyers"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.4864845674774!2d176.45587777695687!3d-39.81850915125386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d42754fe23b1033%3A0x148f14b9c99afa3f!2sSawyers%20Arms!5e0!3m2!1sen!2snz!4v1786850328161!5m2!1sen!2snz"
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <p>388 Highway 50, Tikokino, New Zealand.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className="underline">ART DECO MASONIC HOTEL</p>
            <div
              className="mt-12 flex justify-center"
              style={{ width: '100%', height: '500px' }}
            >
              <iframe
                className="travel-map"
                title="masonic"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.109579793957!2d176.91596561238012!3d-39.48944017148538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d684cdf21e48ca9%3A0xf51a00e5053d469f!2sArt%20Deco%20Masonic%20Hotel!5e0!3m2!1sen!2snz!4v1786840018905!5m2!1sen!2snz"
                style={{ border: '0' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
            <p>Corner of Tennyson Street and Marine Parade, Napier.</p>
            <p>&nbsp;</p>
            <p>
              After the wedding, we will be staying a couple of nights at the
              Masonic hotel.
            </p>
            <p>&nbsp;</p>
            <p>Let us know if you would like to stay or visit us!</p>
          </div>
        </div>
      )}
    </div>
  )
}
