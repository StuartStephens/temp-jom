"use client";
import { Container } from "react-bootstrap";
import Banner, { IBannerProps } from "../shared/Banner/Banner";
import { GenericPageBannerTitle } from "./GenericPageBannerTItle";

export interface IGenericPageBannerProps {
  iconClassName?: string;
  bannerProps: IBannerProps;
  heading?: string;
}

export function GenericPageBanner(props: IGenericPageBannerProps) {
  const { iconClassName, heading, bannerProps } = props;

  return (
    <Banner
      backgroundImgUrl={bannerProps?.backgroundImgUrl}
      backgroundVideoUrl={bannerProps?.backgroundVideoUrl}
      className={`${bannerProps.className} generic-page-banner`}
      ariaTitle={bannerProps?.ariaTitle}
    >
      <Container>
        <GenericPageBannerTitle
          title={heading || ""}
          iconClassName={iconClassName}
        />
      </Container>
    </Banner>
  );
}
