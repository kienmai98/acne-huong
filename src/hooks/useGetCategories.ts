import { useRequest } from 'ahooks'
import { getCategoriesApi } from 'services/video/category'

export function useGetCategories() {
  const { data } = useRequest(getCategoriesApi)

  return { categories: data?.data?.data }
}
