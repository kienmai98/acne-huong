/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import { Box } from 'components/Box'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slider from 'react-slick'
import { useRef } from 'react'
import { styled } from 'styled-components'
import VideoCard from 'components/Card/VideoCard'

interface ReactSliderProps {
  videoData: any
}

const StyledSlider = styled(Slider)`
  .slick-slide > div {
    margin: 0 1rem;
  }
  .slick-list {
    margin: 0 -1rem !important;
    height: 15rem;
  }
`

export function ReactSlider({ videoData }: ReactSliderProps) {
  const ref = useRef<Slider>(null)

  const settings = {
    infinite: true,
    speed: 1000,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  }

  return (
    <Box className="relative">
      <ChevronLeft
        className="absolute -left-12 z-50 text-primary cursor-pointer top-[44%]"
        size={40}
        onClick={() => {
          ref.current?.slickPrev()
        }}
      />

      <ChevronRight
        className="absolute -right-12 z-40 text-primary cursor-pointer top-[44%]"
        size={40}
        onClick={() => {
          ref.current?.slickNext()
        }}
      />

      <StyledSlider ref={ref} {...settings}>
        {videoData.map((video: any) => (
          <VideoCard {...video} key={video._id} hasContent={false} />
        ))}
      </StyledSlider>
    </Box>
  )
}
