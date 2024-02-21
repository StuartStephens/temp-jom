import * as React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { AdditionalBlogRenderer } from "./AdditionalBlogs";

export interface ILatestBlogsBlockProps {}

export function LatestBlogsBlock(props: ILatestBlogsBlockProps) {
  return (
    <Container fluid className="latest-blogs my-5">
      <Row className="featured-row gx-3 gy-5 ">
        <Col xs={12} lg={4} className="featured-blog ">
          <div className="caption h-100 d-flex flex-column justify-content-center align-items-center">
            <div className="bubble-arrow"></div>
            <div>
              <Image
                roundedCircle
                src="https://www.joelosteen.com/globalassets/images/jom/authorimages/author-profile-joel-2020-thumbnail-jpg.jpg"
                height={100}
                width={100}
              ></Image>
            </div>

            <h2 className="title text-truncate-available text-center">
              A Supernatural Flow
            </h2>
            <div>
              {/*eslint-disable-next-line */}
              <a href="#">by Joel Osteen</a>
              <span className="date">September 22, 2023</span>
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          lg={8}
          className=" featured-blog-copy d-flex flex-column justify-content-center"
        >
          <div className="p-5 gap-5 h-100 d-flex flex-column justify-content-center align-items-center">
            <p className="copy ">
              We all have times in life when we’re at a disadvantage. We don’t
              see how we can accomplish our dream, the medical report is not
              good, or a child is off course. We’ve done all we can in our own
              power, but nothing has changed. We’re dealing with the anxiety,
              and it’s tempting to get discouraged and settle where we are. But
              there is a supernatural flow that you can tap into. There is a
              flow of healing that will turn the medical report around. There is
              a flow of favor that will open doors and bring the right people.
              There is a flow of freedom that will break the addiction. This
              flow is within reach, but here’s the key: It has to be activated
              by expecting God’s favor, by declaring His promises, by believing
              He’s working when you don’t see any sign of it.
            </p>
            <div className="button-row text-center">
              <Button variant="primary" className="text-light">
                Read Blog Entry
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="additional-row gx-3 gy-3 mt-5">
        <Col xs={12} md={4} className="">
          <AdditionalBlogRenderer></AdditionalBlogRenderer>
        </Col>
        <Col xs={12} md={4} className="">
          <AdditionalBlogRenderer></AdditionalBlogRenderer>
        </Col>
        <Col xs={12} md={4} className="">
          <AdditionalBlogRenderer></AdditionalBlogRenderer>
        </Col>
      </Row>
    </Container>
  );
}
