import { Col, Container, Image, Row } from "react-bootstrap";
import {
  ILinkItemNode,
  IXHTMLString,
} from "../../../components/cms/types/core/CoreTypes";
import { XHTMLRenderer } from "../../../components/shared/XHTMLRenderer";
import Link from "next/link";

export interface IContactUsInstructionProps {
  instructions: IXHTMLString;
  links: ILinkItemNode[];
}

export function ContactUsInstruction(props: IContactUsInstructionProps) {
  const { instructions, links } = props;
  const logoHeight = 30;
  return (
    <Container
      fluid
      className="d-flex flex-row gap-3 page-gutter page-gutter-small p-5 "
    >
      <Row>
        <Col xs={12} md={8}>
          <XHTMLRenderer xhtml={instructions}></XHTMLRenderer>
        </Col>
        <Col xs={12} md={4}>
          <Container className="d-flex flex-column">
            <div className="pb-2 fs-5 text-uppercase">Or Catch us On:</div>
            <div className="d-flex flex-row border-top border-1 pt-2 gap-2 align-items-center">
              {links &&
                links.map((link) => {
                  switch (link.Name) {
                    case "Roku":
                      return (
                        <Link href={link.Href} key={link.Name}>
                          <Image
                            src={`/third-party-logos/roku-logo.png`}
                            title={link.Title}
                            height={logoHeight}
                          />
                        </Link>
                      );
                    case "YouTube":
                      return (
                        <Link href={link.Href} key={link.Name} className="">
                          <Image
                            src={`/third-party-logos/yt_logo_rgb_light.png`}
                            title={link.Title}
                            height={logoHeight - 10}
                          />
                        </Link>
                      );
                    case "ITunes":
                      return (
                        <Link href={link.Href} key={link.Name}>
                          <Image
                            src={`/third-party-logos/apple-music@1x.png`}
                            title={link.Title}
                            height={logoHeight}
                          />
                        </Link>
                      );
                    default:
                      return null;
                  }
                })}
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
