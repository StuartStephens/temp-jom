// import Banner from "@components/shared/Components/Banner";
// import { MastHeadContent } from "@components/shared/Components/MastHeadContent";
// import { Container } from "react-bootstrap";
// import { HomepageMastheadBlock as HomepageMastheadBlockAlias } from "src/generated";

import { Container } from "react-bootstrap";
import { IBannerArea } from "../../PageViews/PageViewUtils";
import Banner from "../shared/Banner/Banner";
import { MastHeadContent } from "./MastheadContent";

// export interface IHomepageMastheadBlock {
// BackgroundImage: IImage;
// LargeImage: IImage;
// TabletImage: IImage;
// MobileImage: IImage;
// VideoLink: IVideo;
// LineTwo: string;
// LineThree: string;
// Heading: string;
// Links: ILinkItemNode[];
// OverLay: boolean;
// }
export interface IHomepageMastheadBlockProps extends IBannerArea {
  className?: string;
}

export function HomepageMastheadBlock(props: IHomepageMastheadBlockProps) {
  const {
    BackgroundImage,
    LargeImage,
    TabletImage,
    MobileImage,
    VideoLink,
    LineTwo,
    LineThree,
    Heading,
    Links,
    OverLay,
    className,
  } = props;
  const linkProps: any = (props && Links) || [];

  const backgroundImageURL = BackgroundImage?.Url;
  const backgroundImageURL_large =
    (LargeImage && LargeImage.Url) || backgroundImageURL;
  const backgroundImageURL_mobile =
    (MobileImage && MobileImage.Url) || backgroundImageURL;
  const backgroundImageURL_tablet =
    (TabletImage && TabletImage.Url) || backgroundImageURL;

  return (
    <Container fluid className={`full-width ${props.className}`}>
      <Banner
        backgroundImgUrl={BackgroundImage?.Url as string}
        className={`homepage-masthead page-gutter `}
        ariaTitle={Heading || undefined}
        backgroundVideoUrl={VideoLink?.Url}
      >
        <MastHeadContent
          backgroundImageURL={backgroundImageURL}
          backgroundImageURL_large={backgroundImageURL_large}
          backgroundImageURL_mobile={backgroundImageURL_mobile}
          backgroundImageURL_tablet={backgroundImageURL_tablet}
          lineOne={Heading}
          lineTwo={LineTwo}
          lineThree={LineThree}
          className=""
          links={linkProps}
          isOverlay={OverLay}
        />
      </Banner>
    </Container>
  );
}
