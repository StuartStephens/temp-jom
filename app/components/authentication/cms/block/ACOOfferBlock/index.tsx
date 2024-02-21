import { ACOOffer } from "../../../ACOOffer";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../../types/core/CoreTypes";

export interface IACOOfferBlockProps {
  Heading: string;
  SubHeading: string;
  Copy: IXHTMLString;
  Image: IImage;
  Callout: string;
  CTALink: ILinkItemNode;
  ImageOnLeft: boolean;
  ShowContentDivider: boolean;
  IsExclusiveOffer: boolean;
}

export function ACOOfferBlock(props: IACOOfferBlockProps) {
  const {
    Heading,
    Copy,
    SubHeading,
    Image,
    Callout,
    CTALink,
    ImageOnLeft,
    ShowContentDivider,
    IsExclusiveOffer,
  } = props;
  return (
    <ACOOffer
      heading={Heading}
      bodyCopy={Copy}
      subheading={SubHeading}
      image={Image}
      callout={Callout}
      ctalink={CTALink}
      imageOnLeft={ImageOnLeft}
      showContentDivider={ShowContentDivider}
      isExclusiveOffer={IsExclusiveOffer}
    />
  );
}
