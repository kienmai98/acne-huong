import { useRequest } from 'ahooks'
import { CacheKey } from 'config/cache-key'
import { getCategoriesApi } from 'services/video/category'

export function useGetCategories() {
  const { data } = useRequest(getCategoriesApi, {
    cacheKey: CacheKey.CATEGORIES,
  })

  return {
    categories:
      data?.data?.data?.map(({ title, _id }: any) => ({
        label: title,
        value: _id,
      })) ?? [],
  }
}
