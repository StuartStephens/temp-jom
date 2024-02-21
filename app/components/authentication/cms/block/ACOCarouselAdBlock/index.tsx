import { ISpeaker } from "../../../../../app/types";
import {
  ACOCarouselAd,
  ACO_AD_VARIANTS,
} from "../../../FeaturedContentCarousel/ACOCarouselAd";
import { IBannerProps } from "../../../shared/Banner/Banner";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../shared/layouts/PageGutterLayout";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../../types/core/CoreTypes";

export interface IACOContentBlock {
  id: string;
  Variant?: string; //ACO_AD_VARIANTS
  BackgroundImage?: IImage;
  IsDarkBackground: boolean;
  ContentType: string;
  Title: string;
  Author: ISpeaker;
  BodyContent: IXHTMLString;
  SummaryContent: IXHTMLString;
  IsFeatured: boolean;
  PublishedDate: string;
  ContentImageUrl: IImage;
  Links: ILinkItemNode[];
}
export interface IACOCarouselAdBlockProps extends IACOContentBlock {}

//TODO:cTHIS IS GENERATED FROM A RICH TEXT BLOCK CURRENTLY, BUT WE SHOULD COMPONETIZE IT
export function ACOCarouselAdBlock(props: IACOCarouselAdBlockProps) {
  const {
    id,
    Variant,
    BackgroundImage,
    IsDarkBackground,
    ContentType,
    Title,
    Author,
    BodyContent,
    SummaryContent,
    IsFeatured,
    PublishedDate,
    ContentImageUrl,
    Links,
  } = props;
  return (
    <PageGutterLayout
      variant={
        "" + ACO_AD_VARIANTS.FULLWIDTH == Variant
          ? PAGE_GUTTER.NONE
          : PAGE_GUTTER.MEDIUM
      }
    >
      <ACOCarouselAd
        variant={
          "" + ACO_AD_VARIANTS.FULLWIDTH == Variant
            ? ACO_AD_VARIANTS.FULLWIDTH
            : ACO_AD_VARIANTS.STANDARD
        }
        IsDarkBackground={IsDarkBackground}
        backgroundImageUrl={props?.BackgroundImage?.Url}
        imageAltText={`Book Cover: ${ContentImageUrl?.Title}`}
        imageUrl={ContentImageUrl?.Url || "#"}
        copy={BodyContent}
        title={Title}
        links={Links}
        contentType={ContentType}
      />
    </PageGutterLayout>
  );
}
