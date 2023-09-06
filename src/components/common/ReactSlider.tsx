/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import { Box } from 'components/Box'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slider from 'react-slick'
import { useRef } from 'react'
import { styled } from 'styled-components'
import Link from 'next/link'
import { hashVideoTitleToUrl } from 'utils/convertToUrl'

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
        {videoData.map((video: any, index: number) => (
          <Box key={index} className="cursor-pointer">
            <Link
              href={`/videos/${video._id}/${hashVideoTitleToUrl(video.title)}`}
            >
              <Box className="relative mx-auto w-full h-60 hover:scale-105 hover:z-50 transition duration-300">
                <img
                  className="object-cover h-full"
                  src={video?.thumbnail || '/images/thumbnail.jpg'}
                  alt={video.title}
                />

                <div className="inset-0 absolute bg-primary/20 z-20" />
              </Box>
            </Link>
          </Box>
        ))}
      </StyledSlider>
    </Box>
  )
}
