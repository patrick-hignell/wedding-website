function GuestList() {
  return (
    <div className="flex flex-col items-center">
      <h1
        className={`-mb-6 -mt-5 text-center font-['MonteCarlo'] text-[6rem] lg:text-[9rem]`}
      >
        Leanne{' '}
        <span className=" -my-10 block px-4 font-['Imperial_Script'] md:inline">
          &
        </span>{' '}
        Patrick
      </h1>
      <h2 className="text-center font-['MonteCarlo'] text-[3.5rem]">
        full website coming soon!
      </h2>
      <img
        className="mt-12"
        alt="us in a briefcase"
        src="/images/briefcase_open.png"
        style={{ width: 400, height: 'auto' }}
      />
    </div>
  )
}

export default GuestList
