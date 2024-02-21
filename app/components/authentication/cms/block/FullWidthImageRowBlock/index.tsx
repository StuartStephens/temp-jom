import Banner from "../../../shared/Banner/Banner";
import { IImage } from "../../types/core/CoreTypes";

export interface IFullWidthImageBlockProps {
  Name: string;
  Image: IImage;
  MobileImage: IImage;
  TabletImage: IImage;
  LargeImage: IImage;
}

export function FullWidthImageRowBlock(props: IFullWidthImageBlockProps) {
  return (
    <Banner
      ariaRole="presentation"
      backgroundImgUrl={props?.Image?.Url}
      className="full-width-image"
      ariaTitle={props.Name}
    />
  );
}
