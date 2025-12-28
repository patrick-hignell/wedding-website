interface Props {
  date: string
  venue: string
  arrivalTime: string
  ceremonyTime: string
  endTime: string
  imageSrc: string
  imageAlt: string
}

function VenueDetails({
  date,
  venue,
  arrivalTime,
  ceremonyTime,
  endTime,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <>
      <div className="flex-col items-end">
        <img
          alt={imageAlt}
          src={imageSrc}
          style={{ width: 400, height: 'auto' }}
        />
        <p>Date: {date}</p>
        <p>Venue: {venue}</p>
        <p>Arrival Time: {arrivalTime}</p>
        <p>Ceremony Time: {ceremonyTime}</p>
        <p>End Time: {endTime}</p>
      </div>
    </>
  )
}

export default VenueDetails
