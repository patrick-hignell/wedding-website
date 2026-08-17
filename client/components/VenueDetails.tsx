interface Props {
  date?: string
  venue?: string
  address?: string
  country?: string
  arrivalTime?: string
  ceremonyTime?: string
  endTime?: string
  imageSrc?: string
  imageAlt?: string
}

function VenueDetails({
  date,
  venue,
  address,
  country,
  arrivalTime,
  ceremonyTime,
  endTime,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <>
      <div className="flex-col items-end text-center">
        {imageSrc && (
          <div className="mb-4 flex justify-center">
            <img
              className=""
              alt={imageAlt}
              src={imageSrc}
              style={{ width: 400, height: 'auto' }}
            />
          </div>
        )}

        {date && (
          <p className="mb-4">
            <span className=" w-48">Date: </span>
            {date}
          </p>
        )}
        {venue && (
          <p>
            <span className=" w-48">Venue: </span>
            {venue}
          </p>
        )}
        {address && <p>{address}</p>}
        {country && <p className="mb-4">{country}</p>}
        {arrivalTime && (
          <p>
            <span className=" w-48">Arrival Time: </span>
            {arrivalTime}
          </p>
        )}
        {ceremonyTime && (
          <p>
            <span className=" w-48">Ceremony Time: </span>
            {ceremonyTime}
          </p>
        )}
        {endTime && (
          <p>
            <span className=" w-48">End Time: </span>
            {endTime}
          </p>
        )}
      </div>
    </>
  )
}

export default VenueDetails
