interface Props {
  images: string[]
}

export default function Carousel({ images }: Props) {
  return (
    <div className="flex overflow-x-scroll">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex h-[18.75rem] w-[25rem] shrink-0 items-center justify-center"
        >
          <img
            className="h-full w-full border border-black object-cover"
            alt="gwavas garden"
            src={`/images/${image}`}
          />
        </div>
      ))}
    </div>
  )
}
