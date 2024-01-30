"use client";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { usePageDataContext } from "../../contexts/PageContext/Context";
import { useUIStateContext } from "../../contexts/UIStateContext/Context";
import { GenericPageBanner } from "../../components/GenericPageBanner";
import { IBannerProps } from "../../components/shared/Banner/Banner";
import {
  IPageViewProps,
  getBannerClassNameByPageData,
  getBannerIconClassNameByPageData,
} from "../PageViewUtils";
import { MainContents } from "../MainContents";
import { Footer } from "../../components/Footer";

export interface IStandardPageViewProps extends IPageViewProps {
  children: ReactNode;
}

export function StandardPageView(props: IStandardPageViewProps) {
  const { pageData } = usePageDataContext();
  const { } = useUIStateContext();

  const bannerProps = {
    ariaTitle: pageData?.Title,
    backgroundImgUrl: pageData?.GenericHero?.DesktopImage?.Url,
    className: getBannerClassNameByPageData(pageData),
  } as IBannerProps;

  return (
    <Container fluid className="full-width standard-content ">
      {pageData && pageData?.GenericHero && (
        <GenericPageBanner
          bannerProps={bannerProps}
          heading={pageData?.GenericHero?.Heading}
          iconClassName={getBannerIconClassNameByPageData(pageData)}
        />
      )}
      {pageData && (
        <MainContents contentPageData={pageData}>{props.children}</MainContents>
      )}
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
