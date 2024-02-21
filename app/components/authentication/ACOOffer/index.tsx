import {
  IImage,
  ILinkItemNode,
  IXHTMLString,
} from "../cms/types/core/CoreTypes";
import { CTA5050 } from "../shared/CTA5050";

export interface IACOOfferProps {
  heading: string;
  bodyCopy: IXHTMLString;
  subheading: string;
  image: IImage;
  callout: string;
  ctalink: ILinkItemNode;
  imageOnLeft: boolean;
  showContentDivider: boolean;
  isExclusiveOffer: boolean;
}

export function ACOOffer(props: IACOOfferProps) {
  const {
    heading,
    bodyCopy,
    subheading,
    image,
    callout,
    ctalink,
    imageOnLeft,
    showContentDivider,
    isExclusiveOffer,
  } = props;
  return <CTA5050 {...props}></CTA5050>;
}
