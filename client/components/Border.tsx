export default function Border() {
  return (
    <div>
      <img
        src="/images/flowerBorderLB.png"
        alt="Bottom left graphic"
        className="pointer-events-none fixed bottom-0 left-0 -z-10 hidden h-[100vh] md:block"
      />

      <img
        src="/images/flowerBorderRB.png"
        alt="Bottom right graphic"
        className="pointer-events-none fixed bottom-0 right-0 -z-10 hidden h-[100vh] md:block"
      />
      <img
        src="/images/background.png"
        alt="background graphic"
        className="pointer-events-none fixed bottom-0 right-0 -z-20 h-screen w-screen object-cover opacity-25 md:hidden"
      />
    </div>
  )
}
