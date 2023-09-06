import { useState, useCallback } from 'react'

export default function useToggle(initialState = false) {
  const [visible, setVisible] = useState(initialState)

  const toggle = useCallback(() => {
    setVisible((prev) => !prev)
  }, [])

  return { visible, toggle }
}
