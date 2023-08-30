import DashboardLayout from 'app/(dashboard)/layout'
// import getListVideosApi from "app/api/videos"
import ListVideos from 'components/common/ListVideos'
// import { IThumbnail } from "types/common";

function TrendingVideos() {
  return (
    <DashboardLayout>
      <ListVideos title="Trending Videos" />
    </DashboardLayout>
  )
}

export default TrendingVideos
