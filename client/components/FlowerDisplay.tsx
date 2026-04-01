import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface Flower {
  key: number
  imageSrc: string
  xCoord: number
  yCoord: number
  opacity: number
  speed: number
  size: number
  scaleFlip: number
  occupied?: string
  goDown: boolean
  top: number
  bottom: number
}

export default function FlowerDisplay() {
  // const [keys, setKeys] = useState<number[]>([])
  const [flowerArray, setFlowerArray] = useState<Flower[]>([])
  const flowerAmount = 25

  useEffect(() => {
    for (let i = 0; i < flowerAmount; i++) {
      setFlowerArray((prev) => [...prev, randomFlower(true)])
      // setKeys((prev) => [...prev, i])
    }
    setFlowerArray((prev) =>
      [...prev].sort((a, b) => {
        return a.opacity - b.opacity
      }),
    )
  }, [])

  function handleFlowerFinished(index: number) {
    // const sum: number = keys.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0,
    // )
    setFlowerArray((prev) =>
      prev.map((flower, i) => {
        if (i == index) {
          return randomFlower(false)
        }
        return flower
      }),
    )
    // setKeys((prev) =>
    //   prev.map((key, i) => {
    //     if (i == index) {
    //       return sum
    //     }
    //     return key
    //   }),
    // )
  }

  return (
    <div className="relative h-screen w-screen overflow-y-hidden">
      {flowerArray.map((flower, index) => (
        <motion.img
          key={flower.key}
          src={flower.imageSrc}
          alt={flower.imageSrc}
          className={`absolute -z-50 -translate-x-1/2 -translate-y-1/2 transform`}
          initial={{
            top: `${flower.yCoord}%`,
            left: `${flower.xCoord}%`,
            width: `${flower.size}px`,
            transform: `scaleX(${flower.scaleFlip})`,
            opacity: `${flower.opacity}`,
          }}
          animate={{
            top: `${flower.goDown ? flower.bottom : flower.top}%`,
            left: `${flower.xCoord}%`,
            width: `${flower.size}px`,
            transform: `scaleX(${flower.scaleFlip})`,
            opacity: `${flower.opacity}`,
          }}
          transition={{ duration: flower.speed, type: 'tween', ease: 'linear' }}
          onAnimationComplete={() => handleFlowerFinished(index)}
        />
      ))}
    </div>
  )
}

function randomFlower(initial?: boolean): Flower {
  const minWidth = 50
  const maxWidth = 130
  const minSpeed = 20
  const maxSpeed = 30
  const top = -100
  const bottom = 100
  const atTop: boolean = Math.random() < 0.5 ? true : false
  const newFlower = {
    key: Math.random(),
    imageSrc: `/images/flower${randomInt(9)}.png`,
    xCoord: Math.random() * 100,
    yCoord: initial ? Math.random() * 100 : atTop ? top : bottom,
    opacity: randomRange(0.4, 0.8),
    speed: randomRange(minSpeed, maxSpeed),
    size: randomRange(minWidth, maxWidth),
    scaleFlip: Math.random() < 0.5 ? -1 : 1,
    goDown: initial
      ? Math.random() < 0.5
        ? true
        : false
      : atTop
        ? true
        : false,
    top: top,
    bottom: bottom,
    occupied:
      Math.random() < 0.25 && Math.random() < 0.5 ? 'chrysalis' : 'butterfly',
  }
  return newFlower
}

function randomInt(max: number): number {
  return Math.floor(Math.random() * max + 1)
}

function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}
