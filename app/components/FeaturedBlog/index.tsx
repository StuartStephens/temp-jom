"use client";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { IBlog } from "../../types";
import Banner, { IBannerProps } from "../shared/Banner/Banner";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../shared/layouts/PageGutterLayout";
import { AdditionalBlogRenderer } from "./AdditionalBlogs";

export interface IFeaturedBlogsProps {
  featuredBlog?: IBlog;
  additionalBlogs?: IBlog[];
  bannerProps: IBannerProps;
}

export function FeaturedBlogs(props: IFeaturedBlogsProps) {
  const { additionalBlogs, featuredBlog, bannerProps } = props;
  return (
    <Banner
      className="featured-blogs-banner pt-2 pb-2 standard-content"
      backgroundImgUrl={bannerProps.backgroundImgUrl}
    >
      <PageGutterLayout variant={PAGE_GUTTER.NONE}>
        <Container fluid className="featured-blogs my-3">
          <Row className="featured-row gx-3 gy-5 ">
            <Col xs={12} lg={4} className="primary-blog-caption ">
              <div className="caption h-100 d-flex flex-column justify-content-center align-items-center">
                <div className="bubble-arrow"></div>
                <div>
                  <Image
                    roundedCircle
                    src={featuredBlog?.author?.imageUrl}
                    height={100}
                    width={100}
                    alt={`${featuredBlog?.author?.firstName} ${featuredBlog?.author?.lastName}`}
                    role="presentation"
                  ></Image>
                </div>

                <h2 className="title text-truncate-available text-center">
                  {featuredBlog?.title}
                </h2>
                <div>
                  <a href="#">
                    by {featuredBlog?.author?.firstName}{" "}
                    {featuredBlog?.author?.lastName}
                  </a>
                  <span className="date text-muted">
                    {featuredBlog?.publishDate}
                  </span>
                </div>
              </div>
            </Col>
            <Col
              xs={12}
              lg={8}
              className="d-flex flex-column justify-content-center"
            >
              <div className="description pt-5 h-100 d-flex flex-column justify-content-center align-items-center">
                <p className="copy truncate-4-lines">
                  <XHTMLRenderer xhtml={featuredBlog?.content} />
                </p>
                <div className="button-row text-center">
                  <Button
                    variant="primary"
                    className="text-light"
                    onClick={() => {
                      alert(featuredBlog?.id);
                    }}
                  >
                    Read Blog Entry
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="additional-row gx-3 gy-3 mt-1">
            {additionalBlogs &&
              additionalBlogs.map((blog: IBlog) => {
                return (
                  <Col key={"blog_" + blog.id} xs={12} md={4} className="">
                    <AdditionalBlogRenderer
                      blog={blog}
                    ></AdditionalBlogRenderer>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </PageGutterLayout>
    </Banner>
  );
}
