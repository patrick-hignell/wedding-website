interface Props {
  invite?: boolean
}

export default function Header({ invite }: Props) {
  return (
    <div>
      <h1
        className={`-mb-6 -mt-5 text-center font-['MonteCarlo'] text-[6rem] lg:text-[9rem]`}
      >
        Leanne{' '}
        <span className=" -my-10 block px-4 font-['Imperial_Script'] md:inline">
          &
        </span>{' '}
        Patrick
      </h1>
      {invite && (
        <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
          invite you to their wedding celebration
        </h2>
      )}
    </div>
  )
}
