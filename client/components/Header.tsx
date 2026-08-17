interface Props {
  invite?: boolean
}

export default function Header({ invite }: Props) {
  return (
    <div>
      <div className="mb-28 mt-20 flex flex-col text-center font-['castoro'] text-[6rem] tracking-[0.375em]">
        <h1 className="ml-4">LEANNE</h1>
        <p className="mrs-saint-delafield-regular -mb-10 -mt-8 scale-x-110 tracking-normal">
          and
        </p>
        <h1 className="ml-5">PATRICK</h1>
      </div>
      {invite && (
        <h2 className="my-20 text-center font-['georgia'] text-[2rem] tracking-[0.135em]">
          are pleased to invite you
          <br />
          to their
          <br />
          wedding celebration
        </h2>
      )}
    </div>
  )
}
