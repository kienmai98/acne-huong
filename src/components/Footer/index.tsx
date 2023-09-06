import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'lucide-react'
import Navigation from './Navigation'

export function Footer() {
  return (
    <div className="bg-primary pt-20 pb-32 px-36 flex justify-between">
      <div className="flex flex-col gap-4 text-white text-xl">
        <div className="flex items-center gap-3 mb-2">
          Acnehuong Spa & Treatment
        </div>
        <span className="text-neutral-300 text-xs">
          7 Mộc Bài 1, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng, Vietnam.
        </span>
        <span className="text-neutral-300 text-xs">
          090.477.1370 | trungsymedia@gmail.com
        </span>
        <span className="flex items-center gap-4 my-8">
          <TwitterIcon
            className="hover:text-primary cursor-pointer"
            size={12}
          />
          <InstagramIcon
            className="hover:text-primary cursor-pointer"
            size={12}
          />
          <LinkedinIcon
            className="hover:text-primary cursor-pointer"
            size={12}
          />
          <YoutubeIcon
            className="hover:text-primary cursor-pointer"
            size={12}
          />
          <FacebookIcon
            className="hover:text-primary cursor-pointer"
            size={12}
          />
        </span>
      </div>

      <div>
        <Navigation />
      </div>
    </div>
  )
}
