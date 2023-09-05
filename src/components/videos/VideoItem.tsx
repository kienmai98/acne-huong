/* eslint-disable no-underscore-dangle */
import { Col, Row } from 'antd'
import VideoCard from 'components/Card/VideoCard'
import React from 'react'

type VideoItemProps = {
  videos?: any
  loading?: boolean
}

export default function VideoItem({ videos }: VideoItemProps) {
  return (
    <Row gutter={[16, 16]}>
      {videos?.map((video: any) => (
        <Col key={video._id} xs={12} sm={24} md={12} lg={8} xl={6} xxl={6}>
          <VideoCard {...video} hasBorder />
        </Col>
      ))}
    </Row>
  )
}
