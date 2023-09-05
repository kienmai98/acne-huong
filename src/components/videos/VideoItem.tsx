/* eslint-disable no-underscore-dangle */
import VideoCard from 'components/Card/VideoCard'
import React from 'react'

type VideoItemProps = {
  videos?: any
  loading?: boolean
}

export default function VideoItem({ videos }: VideoItemProps) {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 mb-10">
      {videos?.map((video: any) => (
        <VideoCard key={video._id} {...video} hasBorder />
      ))}
    </div>
  )
}
