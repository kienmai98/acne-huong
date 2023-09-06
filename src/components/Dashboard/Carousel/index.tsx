'use client'

import { MoveLeftIcon, MoveRightIcon } from 'lucide-react'
import Image from 'next/legacy/image'
import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import CarouselLabel from './CarouselLabel'

export default function Carousel() {
  const ref = useRef<Slider>(null)

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    swipeToSlide: false,
  }

  return (
    <div className="z-1 relative">
      <MoveLeftIcon
        className="absolute left-0 z-40 text-white ml-20 cursor-pointer top-1/2"
        size={28}
        onClick={() => {
          ref.current?.slickPrev()
        }}
      />

      <MoveRightIcon
        className="absolute right-0 z-40 text-white mr-20 cursor-pointer top-1/2"
        size={28}
        onClick={() => {
          ref.current?.slickNext()
        }}
      />

      <Slider ref={ref} className="h-[50rem]" {...settings}>
        <div className="relative w-screen h-[50rem]">
          <div className="flex items-center absolute justify-center w-full h-full z-40">
            <CarouselLabel
              title="Therapy & Health"
              description="Rela offers a highly personalized, integrative and comprehensive approach to skin care and beauty, providing people with indulgent experiences."
            />
          </div>
          <div className="w-full h-full bg-primary absolute opacity-75 z-30" />
          <Image
            src="/images/home-img.jpeg"
            layout="fill"
            alt="img"
            objectFit="cover"
          />
        </div>

        <div className="relative w-screen h-[50rem]">
          <div className="flex items-center absolute justify-center w-full h-full z-40">
            <CarouselLabel
              title="Relax & Wellness"
              description="We are a full service spa along with offering a great variety of fitness classes that are designed for all levels."
            />
          </div>
          <div className="w-full h-full bg-primary absolute opacity-75 z-30" />
          <Image
            src="/images/home-img-2.jpeg"
            layout="fill"
            alt=""
            objectFit="cover"
          />
          <CarouselLabel
            title="Title Title"
            description="Description & DescriptionDescriptionDescription"
          />
        </div>

        <div className="relative w-screen h-[50rem]">
          <div className="flex items-center absolute justify-center w-full h-full z-40">
            <CarouselLabel
              title="Spa & Beauty"
              description="We'll help you look and feel your best affordably. At Rela, we can help you with whatever you need for your wellness and health."
            />
          </div>
          <div className="w-full h-full bg-primary absolute opacity-75 z-30" />
          <Image
            src="/images/home-img-3.jpeg"
            layout="fill"
            alt=""
            objectFit="cover"
          />
        </div>
      </Slider>
    </div>
  )
}
