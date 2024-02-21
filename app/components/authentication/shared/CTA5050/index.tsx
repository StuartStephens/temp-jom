import { Col, Container, Image, Row } from "react-bootstrap";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../../cms/types/core/CoreTypes";
import { JOMButtonLink } from "../controls/JOMButtonLink";
import { XHTMLRenderer } from "../XHTMLRenderer";

export interface ICTA5050Props {
  heading: string;
  bodyCopy: IXHTMLString;
  subheading: string;
  image: IImage;
  callout: string;
  ctalink: ILinkItemNode;
  imageOnLeft: boolean;
  showContentDivider: boolean;
  isExclusiveOffer: boolean;
}

export function CTA5050(props: ICTA5050Props) {
  const {
    heading,
    bodyCopy,
    subheading,
    image,
    callout,
    ctalink,
    imageOnLeft,
    showContentDivider,
    isExclusiveOffer,
  } = props;
  return (
    <Container
      fluid
      className="cta-5050 full-width bg-body-tertiary p-1 p-md-5  "
    >
      <Container fluid className=" d-flex flex-row  ">
        <Row>
          <Col xs={12} md={5}>
            {heading && <h2>{heading}</h2>}

            {subheading && <h3>{subheading}</h3>}

            {bodyCopy && (
              <div>
                <p className="fw-300">
                  <XHTMLRenderer xhtml={bodyCopy} />
                </p>
              </div>
            )}

            {callout && (
              <div className="py-3 text-center text-md-start">
                <strong className="fw-bolder">{callout}</strong>
              </div>
            )}

            {ctalink && (
              <div className="button-row  text-center text-md-start w-100 mb-3 mb-md-0">
                <JOMButtonLink
                  href={ctalink?.Href}
                  buttonProps={{ variant: "primary", className: "text-white" }}
                >
                  {ctalink?.Title}
                </JOMButtonLink>
              </div>
            )}
          </Col>

          <Col xs={12} md={7}>
            <Container fluid className="full-width d-flex flex-column">
              <Image src={image?.Url} alt={image?.Title} fluid width={700} />
              <caption>{image?.Caption}</caption>
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
