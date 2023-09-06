import { Box } from 'components/Box'
import { Heading } from 'components/Heading'
import { Skeleton } from 'components/Skeleton'
import { ReactSlider } from 'components/common/ReactSlider'
import { useNewestVideos } from 'hooks/useNewestVideos'

export default function NewestVideos() {
  const { loading, videos } = useNewestVideos()
  return (
    <Box className="space-y-4">
      <Heading as="h1" className="text-primary">
        Newest Videos
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
