import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { IACOCarouselAdProps } from "./ACOCarouselAd";
import Link from "next/link";
import Banner, { BANNER_VARIANTS } from "../shared/Banner/Banner";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";

export interface IACOAdStandardVariantProps extends IACOCarouselAdProps {}

export function ACOAdStandardVariant(props: IACOAdStandardVariantProps) {
  const {
    imageUrl,
    imageAltText,
    title,
    copy,
    links,
    backgroundImageUrl,
    IsDarkBackground,
  } = props;
  return (
    <Banner
      className={`py-5`}
      backgroundImgUrl={backgroundImageUrl}
      ariaTitle={title}
      variant={
        IsDarkBackground
          ? BANNER_VARIANTS.LIGHT_TEXT
          : BANNER_VARIANTS.DARK_TEXT
      }
    >
      <Container
        fluid
        // style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        className="aco-carousel-ad d-flex flex-row flex-md-column"
      >
        <Row className="aco-carousel-caption-layout">
          <Col
            xs={12}
            md={4}
            className="d-flex flex-column justify-content-center align-items-center align-items-md-center flex-wrap-nowrap"
          >
            <div>
              <Image
                src={imageUrl}
                className="aco-carousel-image w-100"
                alt={imageAltText}
                role="presentation"
              />
            </div>
          </Col>
          <Col xs={12} md={8}>
            <Container className="full-width d-flex flex-column justify-content-center align-items-center align-items-md-start flex-wrap-nowrap">
              <h1 className="text-center text-md-start">{title}</h1>
              <p className="text-center  text-md-start truncate-4-lines">
                <XHTMLRenderer xhtml={copy} />
              </p>
              {links && (
                <div className="button-row d-flex flex-row justify-content-center justify-content-md-start">
                  {links &&
                    links.map((link: ILinkItemNode, index: number) => {
                      return (
                        <JOMButtonLink
                          key={link?.Title}
                          href={link?.Href || "#"}
                          buttonProps={{
                            variant: index > 0 ? "outline-light" : "primary",
                            className:
                              "me-2 " + (index > 0 ? "" : "text-white"),
                          }}
                        >
                          {link?.Title || "NO TEXT FOUND"}
                        </JOMButtonLink>
                      );
                    })}
                </div>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </Banner>
  );
}
