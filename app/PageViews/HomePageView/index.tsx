"use client";
import { Container } from "react-bootstrap";
import { HomepageMastheadBlock } from "../../components/HomepageMastheadBlock";
import { IPageViewProps, getBannerClassNameByPageData } from "../PageViewUtils";

export interface IHomePageViewProps extends IPageViewProps {
  HomePageStuff?: string;
}

export function HomePageView(props: IHomePageViewProps) {
  const { pageData } = props;

  return (
    <Container fluid className="full-width">
      {/* <GenericPageBanner
        bannerProps={bannerProps}
        heading={pageData.Title}
        iconClassName={getBannerIconClassNameByPageData(pageData)}
      /> */}
      <HomepageMastheadBlock
        {...(pageData?.BannerArea || {})}
        className={getBannerClassNameByPageData(pageData)}
      />
      {props.children}
    </Container>
  );
}
