import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

interface Flower {
  key: number
  imageSrc: string
  xCoord: number
  yCoord: number
  opacity: number
  speed: number
  scale: number
  scaleFlip: number
  occupied?: string
  goDown: boolean
  top: number
  bottom: number
}

export default function FlowerDisplay() {
  // const [keys, setKeys] = useState<number[]>([])
  const [flowerArray, setFlowerArray] = useState<Flower[]>([])
  const initialFlowerAmount = 15
  const flowerAmount = 50
  const interval = 2
  let lastImageSrc = ''

  useEffect(() => {
    for (let i = 0; i < initialFlowerAmount; i++) {
      setFlowerArray((prev) => [...prev, randomFlower(true, prev)])
      // setKeys((prev) => [...prev, i])
    }
    // setFlowerArray((prev) =>
    //   [...prev].sort((a, b) => {
    //     return a.opacity - b.opacity
    //   }),
    // )
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFlowerArray((prev) => {
        if (prev.length < flowerAmount) {
          console.log(`array length: ${prev.length}. adding flower`)
          return [...prev, randomFlower(false, prev)]
        }
        console.log(`array length: ${prev.length}. no flower`)
        return prev
      })
    }, interval * 1000)

    return () => clearInterval(intervalId)
  }, [])

  function handleFlowerFinished(key: number) {
    // const sum: number = keys.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue,
    //   0,
    // )
    setFlowerArray((prev) => prev.filter((flower) => flower.key !== key))
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
    <div className="relative h-screen w-screen overflow-hidden">
      {flowerArray.map((flower) => (
        <motion.img
          key={flower.key}
          src={flower.imageSrc}
          alt={flower.imageSrc}
          className={`absolute -z-50 -translate-x-1/2 -translate-y-1/2 transform`}
          initial={{
            top: `${flower.yCoord}%`,
            left: `${flower.xCoord}%`,
            scale: flower.scale,
            scaleX: flower.scaleFlip,
            opacity: `${flower.opacity}`,
          }}
          animate={{
            top: `${flower.goDown ? flower.bottom : flower.top}%`,
            left: `${flower.xCoord}%`,
            scale: flower.scale,
            scaleX: flower.scaleFlip,
            opacity: `${flower.opacity}`,
          }}
          transition={{ duration: flower.speed, type: 'tween', ease: 'linear' }}
          onAnimationComplete={() => handleFlowerFinished(flower.key)}
        />
      ))}
    </div>
  )

  function randomFlower(initial?: boolean, array: Flower[]): Flower {
    const minScale = 0.5
    const maxScale = 0.6
    const minSpeed = 50
    const maxSpeed = 55
    const top = -100
    const bottom = 100
    const atTop: boolean = Math.random() < 0.5 ? true : false

    let imageSrc = `/images/flower${randomInt(9)}.png`
    if (imageSrc === lastImageSrc) {
      imageSrc = `/images/flower${randomInt(9)}.png`
    }
    lastImageSrc = imageSrc
    const minXDistance = 25
    let xCoord = 0
    for (let i = 0; i < 20; i++) {
      xCoord = Math.random() * 102 - 10
      const tooClose = array.some((flower) => {
        console.log(Math.abs(xCoord - flower.xCoord))
        return (
          Math.abs(xCoord - flower.xCoord) < minXDistance &&
          flower.imageSrc == imageSrc
        )
      })
      if (!tooClose) {
        console.log('just right')
        break
      } else {
        console.log('too close')
      }
    }

    const newFlower = {
      key: Math.random(),
      imageSrc: imageSrc,
      xCoord: xCoord,
      yCoord: initial ? Math.random() * 100 : atTop ? top : bottom,
      opacity: randomRange(0.4, 0.8),
      speed: randomRange(minSpeed, maxSpeed),
      scale: randomRange(minScale, maxScale),
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
}
