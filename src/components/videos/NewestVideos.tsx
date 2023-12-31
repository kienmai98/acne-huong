import { PAGE_SIZE } from 'constants/video.constants'
import { getListApi } from 'services/video/video'
import VideoItem from './VideoItem'

async function getNewestVideos() {
  const res = await getListApi({ pageSize: PAGE_SIZE, page: 1 })

  return res?.data?.data ?? []
}

export default async function NewestVideos() {
  const newestVideos = await getNewestVideos()

  return (
    <div>
      <p className="uppercase text-3xl font-sans font-bold tracking-wide mb-5">
        NEWEST VIDEOS
      </p>

      <VideoItem videos={newestVideos} />
    </div>
  )
}
