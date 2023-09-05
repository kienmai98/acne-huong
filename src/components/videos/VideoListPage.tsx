import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Pagination } from 'antd'
import { PAGE_SIZE } from 'constants/video.constants'
import VideoItem from './VideoItem'

type VideoListProps = {
  categories?: any
  videos: any
  onChangePage?: (newPage: number) => void
  pagination?: {
    nextPage: number
    page: number
    pageSize: number
    prevPage: number
    total: number
    totalPages: number
  }
  loadingVideo?: boolean
  title: string
}

export function VideoListPage({
  categories,
  videos,
  onChangePage,
  pagination,
  loadingVideo = false,
  title,
}: VideoListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categories?.[0]?.title || '',
  )

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId === activeCategory ? null : categoryId)
  }

  const handleCategoryKeyPress = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    categoryId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCategoryClick(categoryId)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <p className="uppercase text-3xl font-sans font-bold tracking-wide mb-5">
        {title}
      </p>
      <div
        className={twMerge(
          'flex gap-3 flex-wrap sm:flex-nowrap ',
          categories && 'mb-5',
        )}
      >
        {categories?.map((category: any) => (
          <span
            key={category.title}
            role="button"
            tabIndex={0}
            onClick={() => handleCategoryClick(category.title)}
            onKeyPress={(event) =>
              handleCategoryKeyPress(event, category.title)
            }
            className={twMerge(
              'whitespace-nowrap font-sans text-lg px-1 py-1 cursor-pointer flex justify-center items-center',
              category.title === activeCategory &&
                'border-inherit border-b-4 border-b-solid border-b-red-500 transition duration-300 text-red-500 font-semibold',
            )}
          >
            {category.title}
          </span>
        ))}
      </div>
      <VideoItem videos={videos} loading={loadingVideo} />
      {pagination && (
        <Pagination
          onChange={onChangePage}
          current={pagination?.page}
          total={pagination?.total}
          pageSize={PAGE_SIZE}
          hideOnSinglePage
          showSizeChanger={false}
        />
      )}
    </div>
  )
}
