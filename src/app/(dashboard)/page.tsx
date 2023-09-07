import { Box } from 'components/Box'
import { Text } from 'components/Text'
import Carousel from 'components/Dashboard/Carousel'
import Services from 'components/Dashboard/Services'
import { Wave } from 'components/Dashboard/Wave'
import { Heading } from 'components/Heading'
import NewestVideos from 'components/NewestCarousel/NewestCarousel'
import { TrendingCarousel } from 'components/TrendingCarousel/TrendingCarousel'
import { ServiceConfig } from 'config/service'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="bg-light min-h-screen h-full flex flex-col">
      <Carousel />

      <Box className="relative">
        <div className="z-10 absolute w-full flex items-center justify-center -bottom-4">
          <Wave />
        </div>
      </Box>

      <Box className="z-10 w-full -mt-72 space-y-10">
        <Services items={ServiceConfig} />
      </Box>

      <Box className="max-w-7xl mx-auto w-full my-20 space-y-10">
        <TrendingCarousel />
        <NewestVideos />
      </Box>

      <Box className="bg-dark/20 w-full py-20 space-y-10">
        <Heading as="h1" className="text-primary text-center">
          About us
        </Heading>

        <Box className="max-w-7xl mx-auto flex items-center justify-start gap-x-10">
          <Image
            width={520}
            height={300}
            src="https://pbs.twimg.com/media/E-AppHvVgAUKNOM?format=jpg&name=4096x4096"
            alt="Workplace"
          />

          <Box className="space-y-6">
            <Heading as="h2" className="text-primary">
              <strong>Acnehuong - Da Nang City</strong>
            </Heading>
            <Text as="p" className="max-w-3xl text-lg text-black">
              The spa center Acnehuong is where tradition meets modern health
              and beauty. It's located in the center of our lovely Da Nang city.
              The Spa at Acnehuong combines all aspects of spa, beauty and
              wellness to create a full service menu with both classic and
              trending services.
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
