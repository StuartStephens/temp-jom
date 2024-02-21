import { Col, Container, Row } from "react-bootstrap";
import { IVideoRowItem } from "../cms/block/VideoRowBlock";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";

export interface IVideoRowItemProps {
  videoRowItem: IVideoRowItem;
}

export function VideoRowItem(props: IVideoRowItemProps) {
  const { videoRowItem } = props;
  return (
    <Container className="video-row-item- d-flex flex-column gx-0 gx-lg-3">
      <Row>
        <Col>
          <div className="youtube-wrapper-16x9">
            <iframe
              width="100%"
              height="100%"
              src={videoRowItem?.Video?.Url}
              title={videoRowItem?.Caption}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row className="px-2 py-3">
        <Col>
          <strong className="fs-4">{videoRowItem.Heading}</strong>
          <XHTMLRenderer xhtml={videoRowItem?.Description} />
        </Col>
      </Row>
    </Container>
  );
}
