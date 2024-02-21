import { ISpeaker } from "../../../../../app/types";
import { ACOCarouselAd } from "../../../FeaturedContentCarousel/ACOCarouselAd";
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
export interface IACOMastheadBlockProps extends IACOContentBlock {}

//TODO:cTHIS IS GENERATED FROM A RICH TEXT BLOCK CURRENTLY, BUT WE SHOULD COMPONETIZE IT
export function ACOMastheadBlock(props: IACOMastheadBlockProps) {
  const {
    id,
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
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <ACOCarouselAd
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
