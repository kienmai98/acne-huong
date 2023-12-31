'use client'

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { EyeFilled } from '@ant-design/icons'
import LazyImage from 'components/common/LazyImage'
import {
  LazyLoadComponent,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { ReactNode } from 'react'
import Link from 'next/link'
import { hashVideoTitleToUrl } from 'utils/convertToUrl'
import styles from './VideoCard.module.scss'

interface VideoCardProps {
  _id: string
  title: ReactNode
  video: any
  thumbnail: any
  views: any
  hasBorder?: boolean
  scrollPosition: ScrollPosition
}

const VideoCard = ({
  _id,
  title,
  video,
  thumbnail,
  views,
  hasBorder = false,
  scrollPosition,
}: VideoCardProps) => {
  const handleMouseOver = (e: any) => {
    e.target.play()
  }

  const handleMouseOut = (e: any) => {
    e.target.pause()
  }

  return (
    <LazyLoadComponent scrollPosition={scrollPosition}>
      <Link
        href={`/videos/${_id}/${hashVideoTitleToUrl(title as string)}`}
        className={`${styles.card} ${hasBorder ? styles.hasBorder : ''}`}
      >
        <LazyImage
          className={styles.card__img}
          src={thumbnail}
          alt={title as any}
        />
        <video
          className={styles.card__video}
          loop
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          muted
          src={video}
        />

        <div className={styles.card__content}>
          <h4 className={styles.card__title}>{title}</h4>
          <p className={styles.card__views}>
            <EyeFilled rev={undefined} />
            <div>{views ?? 0}</div>
          </p>
        </div>
      </Link>
    </LazyLoadComponent>
  )
}

export default trackWindowScroll(VideoCard)
