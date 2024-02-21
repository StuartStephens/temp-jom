import { Col, Container, Row } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { FooterMenuGroup } from "./FooterMenuGroup";
import Link from "next/link";
import { GetTheApp } from "./GetTheApp";
import { FooterSocialGroup } from "./FooterSocialGroup";

export interface IFooterProps { }

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
                      {
                        Href: "/our-ministry/our-ministry-what-we-believe",
                        Title: "What we Believe",
                      } as ILinkItemNode,
                      {
                        Href: "/our-ministry/our-ministry-joel",
                        Title: "About Joel",
                      } as ILinkItemNode,
                      {
                        Href: "/our-ministry/our-ministry-victoria",
                        Title: "About Victoria",
                      } as ILinkItemNode,
                      {
                        Href: "/our-ministry/our-ministry-jonathan",
                        Title: "About Jonathan",
                      } as ILinkItemNode,
                      {
                        Href: "/our-ministry/our-ministry-alexandra",
                        Title: "About Alexandra",
                      } as ILinkItemNode,
                      {
                        Href: "/our-ministry/our-ministry-lakewood",
                        Title: "About Lakewood",
                      } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Watch"
                    links={[
                      {
                        Href: "/how-to-watch/messages",
                        Title: "Messages",
                      } as ILinkItemNode,
                      {
                        Href: "/how-to-watch/broadcasts",
                        Title: "Broadcasts",
                      } as ILinkItemNode,
                      {
                        Href: "/how-to-watch/podcasts",
                        Title: "Podcasts",
                      } as ILinkItemNode,
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
                      {
                        Href: "/inspiration/this-month",
                        Title: "This Month",
                      } as ILinkItemNode,
                      {
                        Href: "/inspiration/todays-word",
                        Title: "Today's Word",
                      } as ILinkItemNode,
                      {
                        Href: "/inspiration/blogs",
                        Title: "Blogs",
                      } as ILinkItemNode,
                      {
                        Href: "/inspiration/articles",
                        Title: "Articles",
                      } as ILinkItemNode,
                      {
                        Href: "/inspiration/wallpapers",
                        Title: "Wallpapers",
                      } as ILinkItemNode,
                    ]}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Community"
                    links={[
                      {
                        Href: "/community/prayer-wall",
                        Title: "Prayer Wall",
                      } as ILinkItemNode,
                      {
                        Href: "/community/shouts-of-praise",
                        Title: "Shouts of Praise",
                      } as ILinkItemNode,
                      {
                        Href: "/community/share-your-story",
                        Title: "Share Your Story",
                      } as ILinkItemNode,
                      {
                        Href: "/community/find-a-church",
                        Title: "Find A Church",
                      } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Store"
                    links={[
                      {
                        Href: "/store/featured",
                        Title: "Featured",
                      } as ILinkItemNode,
                      { Href: "/store/books", Title: "Books" } as ILinkItemNode,
                      { Href: "/store/music", Title: "Music" } as ILinkItemNode,
                      {
                        Href: "/store/series",
                        Title: "Series",
                      } as ILinkItemNode,
                      { Href: "/store/gifts", Title: "Gifts" } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="My Library"
                    links={[
                      {
                        Href: "/library/recent",
                        Title: "Recent",
                      } as ILinkItemNode,
                      {
                        Href: "/library/books",
                        Title: "Books",
                      } as ILinkItemNode,
                      {
                        Href: "/library/audio",
                        Title: "Audio",
                      } as ILinkItemNode,
                      {
                        Href: "/library/videos",
                        Title: "Videos",
                      } as ILinkItemNode,
                      {
                        Href: "/library/images",
                        Title: "Images",
                      } as ILinkItemNode,
                      {
                        Href: "/library/manage",
                        Title: "Manage",
                      } as ILinkItemNode,
                    ]}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <FooterMenuGroup
                    title="Contact Us"
                    links={[
                      {
                        Href: "/contact-us",
                        Title: "Email Us",
                      } as ILinkItemNode,
                      {
                        Href: "/contact-us/contactenos",
                        Title: "Contactenos",
                      } as ILinkItemNode,
                      {
                        Href: "/contact-us/contact-info",
                        Title: "Contact Info",
                      } as ILinkItemNode,
                      {
                        Href: "/contact-us/frequently-asked-questions",
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
