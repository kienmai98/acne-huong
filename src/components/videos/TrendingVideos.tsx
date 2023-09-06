'use client'

import { useUpdateEffect } from 'ahooks'
import { useTrendingVideos } from 'hooks/useTrendingVideos'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useGetCategories } from 'hooks/useGetCategories'
import { Box } from 'components/Box'
import { Pagination, Skeleton } from 'antd'
import VideoItem from './VideoItem'

export default function TrendingVideos() {
  const ref = useRef<HTMLDivElement>(null)

  const {
    filter,
    videos,
    handleChangeCategory,
    total,
    handleChangePage,
    loading,
  } = useTrendingVideos()

  useUpdateEffect(() => {
    ref.current?.scrollIntoView()
  }, [filter])

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-5">
        <p className="uppercase text-3xl font-sans font-bold tracking-wide flex-1">
          TRENDING VIDEOS
        </p>
        {/* <Input.Search
          className="w-[300px]"
          size="large"
          placeholder="Find Video..."
          onSearch={handleChangeSearch}
        /> */}
      </div>

      <div className="mb-4">
        <Categories
          onSelectCategory={handleChangeCategory}
          selectedCategory={filter.categoryIds}
        />
      </div>

      <Skeleton loading={loading} active>
        {videos.length > 0 ? (
          <VideoItem videos={videos} />
        ) : (
          <div style={{ color: 'var(--primary)' }}>No videos found...</div>
        )}

        {!!total && (
          <div className="w-full grid place-items-center mt-5">
            <Pagination
              current={filter.page}
              total={total}
              onChange={handleChangePage}
              pageSize={16}
              hideOnSinglePage
              showSizeChanger={false}
            />
          </div>
        )}
      </Skeleton>
    </div>
  )
}

function Categories({ onSelectCategory, selectedCategory }: any) {
  const { categories } = useGetCategories()

  return (
    <div className="flex gap-3 flex-wrap sm:flex-nowrap">
      {[{ label: 'All', value: '' }, ...categories].map(
        ({ label, value }: any) => (
          <Box
            as="span"
            key={value}
            role="button"
            tabIndex={0}
            className={twMerge(
              'whitespace-nowrap font-sans text-lg px-1 py-1 cursor-pointer flex justify-center items-center capitalize',
              value === selectedCategory &&
                'border-inherit border-b-4 border-b-solid border-b-red-500 transition duration-300 text-red-500 font-semibold',
            )}
            onClick={onSelectCategory(value)}
          >
            {label}
          </Box>
        ),
      )}
    </div>
  )
}
