"use client";

import { Container } from "react-bootstrap";
import Banner from "../shared/Banner/Banner";
import { JOMButtonLink } from "../shared/controls/JOMButtonLink";
import {
  ACOCarouselAd,
  ACO_AD_VARIANTS,
} from "../FeaturedContentCarousel/ACOCarouselAd";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import { Footer } from "../Footer";

export interface IPageNotFoundProps {}

export function PageNotFound(props: IPageNotFoundProps) {
  return (
    <Container fluid className="full-width">
      <Banner backgroundImgUrl="https://www.joelosteen.com/globalassets/images/jom/404/lakewoodchurch404halfhero2x-jpg/largedisplay.jpg">
        <Container
          fluid
          className="d-flex flex-column gap-3 justify-content-center align-items-center p-3"
          style={{ textShadow: "1px 1px gray" }}
        >
          <h1>404</h1>
          <h2>
            This page no longer exists or has moved. We are sorry for the
            inconvenience.
          </h2>
          <div className="button-row  text-center text-md-center w-100">
            <JOMButtonLink
              href="/home?donate=true"
              buttonProps={{
                variant: "outline-light",
                className: "text-white mx-2",
                style: { textShadow: "1px 1px gray" },
              }}
            >
              Give
            </JOMButtonLink>
            <JOMButtonLink
              href="/home?isLogin=true"
              buttonProps={{
                variant: "outline-light",
                className: "text-white",
                style: { textShadow: "1px 1px gray" },
              }}
            >
              Create an Account
            </JOMButtonLink>
          </div>
          <h2>
            If you need further assistance, please call our customer service at
            800-278-0520.
          </h2>
        </Container>
      </Banner>

      <ACOCarouselAd
        IsDarkBackground={false}
        imageAltText="2024 Devotional Calendar"
        imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2024-01-todays-word-devotional-planner/jom-0124-aco-home-product.png"
        copy={{
          Data: "Every January we create a fresh, God-inspired devotional calendar that will boost your faith all through the year. This year, declare God's promises over your life and your family, and watch God take you to new levels.",
        }}
        title="In appreciation for your gift this month"
        links={[{ Href: "#", Title: "Request Now" } as ILinkItemNode]}
        contentType={ACO_AD_VARIANTS.FULLWIDTH}
      />
      <Container
        fluid
        className="full-width bg-black d-flex flex-row justify-content-center "
      >
        <Container
          fluid
          style={{ minHeight: "10rem" }}
          className="text-white full-width"
        >
          <Footer />
        </Container>
      </Container>
    </Container>
  );
}
