import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { IACOCarouselAdProps } from "./ACOCarouselAd";
import Link from "next/link";
import Banner, { BANNER_VARIANTS } from "../shared/Banner/Banner";

export interface IACOAdFullPageVariantProps extends IACOCarouselAdProps {}

export function ACOAdFullPageVariant(props: IACOAdFullPageVariantProps) {
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
      className=" py-5"
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
        className="aco-carousel-ad aco-carousel-ad-variant-fw d-flex flex-row flex-md-column"
      >
        <Row className="aco-carousel-caption-layout">
          <Col
            xs={12}
            md={12}
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
          <Col xs={12} md={12}>
            <Container className="page-gutter page-gutter-large d-flex flex-column justify-content-center align-items-center align-items-md-center flex-wrap-nowrap">
              <h1 className="mt-3 text-center text-md-center">{title}</h1>
              <p className="mt-3 text-center  text-md-center truncate-4-lines">
                <XHTMLRenderer xhtml={copy} />
              </p>
              {links && (
                <div className="mt-3 button-row">
                  {links &&
                    links.map((link: ILinkItemNode) => {
                      return (
                        <Link
                          key={link?.Title}
                          href={link?.Href || "#"}
                          passHref
                        >
                          <Button key={link?.Title} className="aco-button">
                            {link?.Title || "NO TEXT FOUND"}
                          </Button>
                        </Link>
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
