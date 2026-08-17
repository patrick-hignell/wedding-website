import { useRef, useState, useEffect, MouseEvent } from 'react'

export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: MouseEvent) => {
    if (!ref.current) return
    setIsDown(true)
    startX.current = e.pageX - ref.current.offsetLeft
    scrollLeft.current = ref.current.scrollLeft
  }

  useEffect(() => {
    if (!isDown) return

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (!ref.current) return
      e.preventDefault()
      const x = e.pageX - ref.current.offsetLeft
      const walk = (x - startX.current) * 1.5
      ref.current.scrollLeft = scrollLeft.current - walk
    }

    const handleMouseUp = () => setIsDown(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDown])

  return {
    ref,
    props: { onMouseDown },
  }
}
