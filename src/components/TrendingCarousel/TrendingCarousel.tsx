'use client'

import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { Skeleton } from 'components/Skeleton'
import { ReactSlider } from 'components/common/ReactSlider'
import { useTrendingVideos } from 'hooks/useTrendingVideos'

export function TrendingCarousel() {
  const { videos, loading } = useTrendingVideos()

  return (
    <Box className="space-y-4">
      <Heading as="h1" className="text-primary">
        Trending Youtube Videos
      </Heading>

      {loading ? (
        <Box className="flex gap-x-10 h-72">
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
          <Skeleton className="h-60 w-full" />
        </Box>
      ) : (
        <ReactSlider videoData={videos} />
      )}
    </Box>
  )
}
