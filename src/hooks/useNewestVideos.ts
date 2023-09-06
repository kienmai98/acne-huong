'use client'

import { useRequest } from 'ahooks'
import { CacheKey } from 'config/cache-key'
import { getListApi } from 'services/video/video'

export function useNewestVideos() {
  const { data, loading } = useRequest(
    () => getListApi({ page: 1, pageSize: 10 }),
    {
      cacheKey: CacheKey.NEWEST_VIDEO,
    },
  )

  return {
    loading,
    videos: data?.data?.data ?? [],
  }
}
