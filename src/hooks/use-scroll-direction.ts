import { useState, useEffect } from 'react'

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>()

  useEffect(() => {
    let lastScrollY = global.scrollY

    const updateScrollDirection = () => {
      const { scrollY } = global
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction)
      }
      lastScrollY = scrollY > 0 ? scrollY : 0
    }
    global.addEventListener('scroll', updateScrollDirection) // add event listener
    return () => {
      global.removeEventListener('scroll', updateScrollDirection) // clean up
    }
  }, [scrollDirection])

  return scrollDirection
}
