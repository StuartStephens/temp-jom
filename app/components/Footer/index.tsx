import { Col, Container, Row } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { FooterMenuGroup } from "./FooterMenuGroup";
import Link from "next/link";
import { GetTheApp } from "./GetTheApp";
import { FooterSocialGroup } from "./FooterSocialGroup";

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  return (
    <Container fluid className="full-width footer">
      <Container
        fluid
        className="full-width d-flex flex-column justify-items-center p-3"
      >
        <h3 className="p-3 fs-5 page-gutter page-gutter-large align-self-center text-center">
          THANK YOU FOR YOUR GENEROSITY. HAVING TROUBLE GIVING?
          <br />
          <Link href="#">CLICK HERE TO GIVE</Link> OR CALL 888-567-5635.
        </h3>

        <Container
          fluid
          className="d-flex flex-column flex-md-column flex-lg-row "
        >
          <Container
            fluid
            className="app-and-social d-flex flex-column flex-md-row flex-lg-column"
          >
            <GetTheApp />
            <FooterSocialGroup title="Social" />
          </Container>

          <Container
            fluid
            className="d-flex flex-column flex-md-column justify-content-center "
          >
            <Container
              fluid
              className="footer-menu-group-wrapper full-width mt-3 mt-md-3 mt-lg-0    "
            >
              <Row>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Our Ministry"
                    links={[
                      { Href: "#", Title: "What We Believe" } as ILinkItemNode,
                      { Href: "#", Title: "About Joel" } as ILinkItemNode,
                      { Href: "#", Title: "About Victoria" } as ILinkItemNode,
                      { Href: "#", Title: "About Jonathan" } as ILinkItemNode,
                      { Href: "#", Title: "About Alexandra" } as ILinkItemNode,
                      { Href: "#", Title: "About Lakewood" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Watch"
                    links={[
                      { Href: "#", Title: "Messages" } as ILinkItemNode,
                      { Href: "#", Title: "Broadcasts" } as ILinkItemNode,
                      { Href: "#", Title: "Podcasts" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Events"
                    links={[
                      { Href: "#", Title: "A Night of Hope" } as ILinkItemNode,
                      { Href: "#", Title: "Book Signings" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Inspiration"
                    links={[
                      { Href: "#", Title: "This Month" } as ILinkItemNode,
                      { Href: "#", Title: "Today's Word" } as ILinkItemNode,
                      { Href: "#", Title: "Blogs" } as ILinkItemNode,
                      { Href: "#", Title: "Articles" } as ILinkItemNode,
                      { Href: "#", Title: "Wallpaper" } as ILinkItemNode,
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Community"
                    links={[
                      { Href: "#", Title: "Prayer Wall" } as ILinkItemNode,
                      { Href: "#", Title: "Shouts of Praise" } as ILinkItemNode,
                      { Href: "#", Title: "Share Your Story" } as ILinkItemNode,
                      { Href: "#", Title: "Find A Church" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Store"
                    links={[
                      { Href: "#", Title: "Featured" } as ILinkItemNode,
                      { Href: "#", Title: "Books" } as ILinkItemNode,
                      { Href: "#", Title: "Music" } as ILinkItemNode,
                      { Href: "#", Title: "Series" } as ILinkItemNode,
                      { Href: "#", Title: "Gifts" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="My Library"
                    links={[
                      { Href: "#", Title: "Recent" } as ILinkItemNode,
                      { Href: "#", Title: "Books" } as ILinkItemNode,
                      { Href: "#", Title: "Audio" } as ILinkItemNode,
                      { Href: "#", Title: "Videos" } as ILinkItemNode,
                      { Href: "#", Title: "Images" } as ILinkItemNode,
                      { Href: "#", Title: "Manage" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Contact Us"
                    links={[
                      { Href: "#", Title: "Email Us" } as ILinkItemNode,
                      { Href: "#", Title: "Contactenos" } as ILinkItemNode,
                      { Href: "#", Title: "Contact Info" } as ILinkItemNode,
                      {
                        Href: "#",
                        Title: "Frequently Asked Questions",
                      } as ILinkItemNode,
                    ]}
                  />
                </Col>
              </Row>
            </Container>
            <Container
              fluid
              className="full-width d-flex flex-column flex-md-row justify-content-start justify-content-md-start  justify-content-lg-start    "
            ></Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
