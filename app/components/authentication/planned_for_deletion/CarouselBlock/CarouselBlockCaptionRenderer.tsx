import { Button, Col, Container, Image, Row } from "react-bootstrap";

export interface ICarouselBlockCaptionRendererProps {
  imageUrl: string;
  title: string;
  copy: string;
  link: string;
  linkText: string;
  backgroundImageUrl?: string;
}

export default function CarouselBlockCaptionRenderer(
  props: ICarouselBlockCaptionRendererProps
) {
  const { imageUrl, title, copy, link, linkText, backgroundImageUrl } = props;
  function handleButtonClicked(url: String) {
    alert("button clicked" + url);
  }
  const rendererStyle = { backgroundImage: `url('${backgroundImageUrl}')` };

  return (
    <Container className="carousel-caption-renderer" style={rendererStyle}>
      <div className="carousel-caption-layout">
        <Row className="">
          <Col xs={4} className="left-column">
            <Image src={imageUrl} height={200} className="" />
          </Col>
          <Col xs={8} className="right-column ">
            <h1>{title}</h1>
            <p>{copy}</p>
            <Button onClick={() => handleButtonClicked(link)}>
              {linkText || "NO TEXT FOUND"}
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
