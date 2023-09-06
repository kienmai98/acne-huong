import { Wave } from 'components/Dashboard/Wave'
import Image from 'next/image'

interface HeroSectionProps {
  image: string
  title: string
  description?: string
}

export function HeroSection({ description, image, title }: HeroSectionProps) {
  return (
    <div className="w-full h-[48rem] relative overflow-hidden">
      <Image className="object-cover" fill src={image} alt="our-spa" />

      <div className="absolute z-10 inset-0 bg-neutral-800/70" />

      <div className="z-10 absolute w-full flex items-center justify-center left-0 bottom-0">
        <Wave />
      </div>

      <div className="flex flex-col items-center gap-y-4 z-20 justify-center w-full h-full absolute -top-20">
        <h1 className="text-white text-6xl">{title}</h1>
        <p className="text-gray-400 max-w-2xl text-center">{description}</p>
      </div>
    </div>
  )
}
