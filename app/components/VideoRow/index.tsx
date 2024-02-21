import { Col, Container, Row } from "react-bootstrap";
import { VideoRowItem } from "./VideoRowItem";
import { IVideoRowItem } from "../cms/block/VideoRowBlock";

export interface IVideoRowProps {
  videos: IVideoRowItem[];
}

export function VideoRow(props: IVideoRowProps) {
  const { videos } = props;
  return (
    <Container fluid className="video-row my-3 page-gutter page-gutter-small ">
      <Row className="">
        <Col className="heading text-center text-md-left mt-3 mb-4">
          <h2>Watch these stories of faith, and be encouraged</h2>
        </Col>
      </Row>
      <Row className="justify-content-between">
        {videos &&
          videos.map((video: IVideoRowItem) => {
            return (
              <Col key={video.Id} xs={12} lg={4}>
                <VideoRowItem videoRowItem={video} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}
