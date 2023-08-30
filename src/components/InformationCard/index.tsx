import { EyeFilled } from '@ant-design/icons'
import { Image } from 'antd'

interface InformationCardProps {
  title: string
  description: string
  // video: string;
  thumbnail: string
  views: number
}

// type VideoEvent = React.MouseEvent<HTMLVideoElement>;

const InformationCard = ({
  title,
  description,
  // video,
  thumbnail,
  views,
}: InformationCardProps) => {
  // const handleMouseOver = (e: VideoEvent) => {
  //   e.currentTarget.play()
  // }

  // const handleMouseOut = (e: VideoEvent) => {
  //   e.currentTarget.pause()
  // }

  return (
    <div>
      <Image src={thumbnail} />
      {/* <video src={video} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} loop muted /> */}

      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>
          <span style={{ marginRight: 4 }}>
            <EyeFilled rev={undefined} />
          </span>
          {views ?? 0}
        </p>
      </div>
    </div>
  )
}

export default InformationCard
