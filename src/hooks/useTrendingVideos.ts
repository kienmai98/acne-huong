'use client'

import { useRequest, useSetState } from 'ahooks'
import { CacheKey } from 'config/cache-key'
import { getListApi } from 'services/video/video'

export function useTrendingVideos() {
  const [filter, setFilter] = useSetState({
    page: 1,
    pageSize: 16,
    sort: 'view',
    categoryIds: '',
    search: '',
  })

  const { data, loading } = useRequest(() => getListApi(filter), {
    cacheKey: CacheKey.TRENDING_VIDEOS,
    refreshDeps: [filter],
  })

  const handleResetPage = () => {
    setFilter({
      page: 1,
    })
  }

  const handleChangeSearch = (value: string) => {
    handleResetPage()
    setFilter({ search: value })
  }

  const handleChangeCategory = (value: string) => () => {
    handleResetPage()
    setFilter({ categoryIds: value })
  }

  const handleChangePage = (page: number) => {
    setFilter({ page })
  }

  return {
    filter,
    loading,
    handleChangeSearch,
    handleChangeCategory,
    handleChangePage,
    videos: data?.data?.data ?? [],
    total: data?.data?.pagination?.total ?? 0,
  }
}
