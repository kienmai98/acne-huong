import { Row, Col } from 'antd'
import InformationCard from 'components/InformationCard'
import { IThumbnail } from 'types/common'

interface ListVideosProps {
  title: string
  listVideos?: IThumbnail[]
}

const ListVideos = ({ title, listVideos }: ListVideosProps) => (
  <div>
    <h2>{title}</h2>
    <div>
      <Row gutter={[24, 24]}>
        {listVideos?.map((item, id) => (
          <Col key={id} xs={12} md={12} lg={6}>
            <InformationCard
              title={item.title}
              thumbnail={item.thumbnail}
              // video={item.video}
              description={item.description}
              views={item.views}
            />
          </Col>
        ))}
      </Row>
    </div>
  </div>
)

export default ListVideos
