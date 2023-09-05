import NewestVideos from 'components/videos/NewestVideos'
import TrendingVideos from 'components/videos/TrendingVideos'

export default function VideoPage() {
  return (
    <div className="flex flex-col gap-10 mb-10 max-w-7xl mx-auto">
      {/* @ts-ignore */}
      <NewestVideos />
      <TrendingVideos />
    </div>
  )
}
