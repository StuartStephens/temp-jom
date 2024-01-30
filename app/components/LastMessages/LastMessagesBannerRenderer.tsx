import { Button, Col, Container, Row } from "react-bootstrap";
import Banner, { IBannerProps } from "../shared/Banner/Banner";
import { useAuth } from "../../contexts/Auth/Context";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import { IMessage } from "../../types";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";

export interface ILastMessagesBannerRendererProps {
  message: IMessage;
  bannerProps: IBannerProps;
  links: ILinkItemNode[];
}

//TODO: need to implement the click handlers
function handlePrimaryLinkClicked(message: IMessage) {
  alert("Link Clicked" + message.primaryLink);
}
function handleSecondaryLinkClicked(message: IMessage) {
  alert("Link Clicked" + message.secondaryLink);
}

export function LastMessagesBannerRenderer(
  props: ILastMessagesBannerRendererProps
) {
  const { message, bannerProps, links } = props;
  const { isLibraryEnabled } = useAuth();
  if (!message) {
    return null;
  }
  return (
    <Banner
      className="last-messages-banner"
      backgroundImgUrl={bannerProps.backgroundImgUrl || ""}
      ariaTitle={bannerProps.ariaTitle || "background image"}
    >
      <Container fluid className="page-gutter last-messages-banner-content">
        <Row xs={1} xl={2} className="last-messages-banner-content-row">
          <Col className="last-messages-banner-layout">
            <div className="last-messages-banner-title-area">
              <h2>
                <a href="#">{message.title}</a>
              </h2>
              <p className="mb-0">
                <a href="#" className="pe-3">
                  {message?.speaker.firstName} {message?.speaker.lastName}
                </a>
                <span className="message-date">{message?.displayDate}</span>
              </p>
              {isLibraryEnabled && (
                <div className="mb-3">
                  <i className="bi bi-play-fill pe-3 d-none d-md-inline"></i>
                  <i className="bi bi-play-circle pe-3 d-inline d-md-none"></i>
                </div>
              )}
            </div>

            <div className="last-messages-banner-copy">
              <p className="copy">
                <XHTMLRenderer xhtml={message?.copy} />
              </p>

              {links && links.length > 0 && (
                <div className="button-row d-flex flex-column gap-2  ">
                  <Button
                    variant="primary"
                    className=" me-0 me-lg-3 "
                    onClick={() => {
                      handlePrimaryLinkClicked(message);
                    }}
                  >
                    <div className="watch-now-button-contents">
                      <i className="bi bi-play-fill pe-3 d-none d-md-inline"></i>
                      <i className="bi bi-play-circle pe-3 d-inline d-md-none"></i>
                      <span text-nowrap>{links[0]?.Title}</span>
                    </div>
                  </Button>
                </div>
              )}

              {links && links.length > 1 && (
                <div className="button-row d-flex flex-column gap-2  ">
                  <Button
                    variant="outline-light"
                    className="me-0 me-lg-3 "
                    onClick={() => {
                      handleSecondaryLinkClicked(message);
                    }}
                  >
                    <span text-nowrap>{links[1]?.Title}</span>
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Banner>
  );
}
