import { CTA5050 } from "../../../shared/CTA5050";
import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../../types/core/CoreTypes";

export interface ICTA5050BlockProps {
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

export function CTA5050Block(props: ICTA5050BlockProps) {
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
    <CTA5050
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
