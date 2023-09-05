/* eslint-disable jsx-a11y/mouse-events-have-key-events */

'use client'

export default function CardMiniVideo(props: any) {
  const handleMouseOver = (e: any) => {
    e.target.play()
  }

  const handleMouseOut = (e: any) => {
    e.target.pause()
  }

  return (
    <video
      loop
      muted
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
      {...props}
    />
  )
}
