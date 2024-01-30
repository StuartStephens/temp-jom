import { ILinkItemNode, IXHTMLString } from "../cms/types/core/CoreTypes";
import { IBannerProps } from "../shared/Banner/Banner";
import { ACOAdStandardVariant } from "./ACOAdCarouselStandardVariant";
import { ACOAdFullPageVariant } from "./ACOAdFullPageVariant";

export enum ACO_AD_VARIANTS {
  STANDARD = "STANDARD",
  FULLWIDTH = "FULLWIDTH",
}
export interface IACOCarouselAdProps {
  variant?: ACO_AD_VARIANTS;
  imageUrl: string;
  imageAltText: string;
  IsDarkBackground?: boolean;
  title?: string;
  copy: IXHTMLString;
  links?: ILinkItemNode[];
  backgroundImageUrl?: string;
  contentType: string;
  bannerProps?: IBannerProps;
}

export function ACOCarouselAd(props: IACOCarouselAdProps) {
  switch (props.variant) {
    case ACO_AD_VARIANTS.STANDARD:
      return <ACOAdStandardVariant {...props} />;
    case ACO_AD_VARIANTS.FULLWIDTH:
      return <ACOAdFullPageVariant {...props} />;
    default:
      return <ACOAdStandardVariant {...props} />;
  }
}
