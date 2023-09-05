'use client'

/* eslint-disable no-underscore-dangle */

import { Col, Row } from 'antd'
import classNames from 'classnames/bind'
import VideoPlayer from 'components/VideoPlay'
import { usePathname } from 'next/navigation'
import { useGetDataById } from 'hooks/useGetDataById'
import { postComment } from 'hooks/usePostComment'
import { useGetData } from 'hooks/useGetData'
import Reply from 'components/reply'
import VideoCard from 'components/Card/VideoCard'
import LazyImage from 'components/common/LazyImage'
import styles from './styles.module.scss'
import { formatDate } from '../../../../../services/video/video'
import Comment from '../../../../../components/comment'

const cx = classNames.bind(styles)

const Video = () => {
  const router = usePathname()
  const id = router?.split('/')[2]

  const { data } = useGetDataById({
    url: `api/items/${id}`,
  })

  const {
    data: commentData,
    loading: loadingComment,
    refetchData,
  } = useGetData({
    url: `api/comments/items/${id}`,
  })

  const { data: videoData } = useGetData({
    url: 'api/items',
  })

  const handleComment = (data: any) => {
    postComment({
      id,
      data,
      onSuccess() {
        refetchData()
      },
    })
  }

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="mb-12">
        <div className={cx('video__wrapper', 'container')}>
          <h1 className={cx('video__title')}>{data?.data?.title || 'Title'}</h1>
          <Row
            gutter={[24, 24]}
            align="middle"
            justify="space-between"
            className={cx('video__content')}
          >
            <Col lg={24} xl={12}>
              <Row
                className={cx('video__section')}
                align="middle"
                justify="space-between"
              >
                <Col md={24} xs={24} className={cx('video__thumbnail')}>
                  <LazyImage
                    src={data?.data?.thumbnail?.path}
                    alt={data?.data?.title}
                    className={cx('video__thumbnail')}
                  />
                </Col>
                <Col>
                  <Row
                    className={cx('video__detail')}
                    align="middle"
                    justify="space-between"
                  >
                    <div>
                      <p>
                        Premier: {formatDate(data?.data?.createdAt) || '--'}
                      </p>
                      <p>Country: {data?.data?.country || 'Viet Nam'}</p>
                    </div>
                    <p className={cx('video__desc')}>
                      {data?.data?.description || 'Mô tả'}
                    </p>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={24} xl={12} className={cx('video__video')}>
              <VideoPlayer url={data?.data?.video?.path} />
            </Col>
          </Row>
        </div>
      </div>

      <div className={cx('container')}>
        <Row justify="space-between" gutter={[24, 24]}>
          <Col lg={16} sm={24}>
            <h2 className="uppercase text-3xl font-sans font-bold tracking-wide mb-5">
              Comments
            </h2>
            {commentData?.map((item: any) => (
              <Comment
                key={item._id}
                onComment={handleComment}
                item={item}
                loading={loadingComment}
              />
            ))}
            <Reply onComment={handleComment} loading={loadingComment} />
          </Col>

          <Col lg={8} sm={24}>
            <h2 className="uppercase text-3xl font-sans font-bold tracking-wide mb-5">
              Related Videos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {videoData?.slice(0, 3)?.map((video: any) => (
                <VideoCard {...video} key={video._id} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Video
