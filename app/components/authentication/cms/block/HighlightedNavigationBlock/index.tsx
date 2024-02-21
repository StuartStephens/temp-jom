import { HighlightedNavigation } from "../../../HighlightedNavigation";
import { IImageRowItem } from "../../../HighlightedNavigation/HighlightedNavigationItem";
import { IImage, ILinkItemNode } from "../../types/core/CoreTypes";

export interface IHighlightedNavigationBlockItem {
  Heading?: string;
  Heading2?: string;
  Icon?: IImage;
  Link?: ILinkItemNode;
}

export interface IHighlightedNavigationBlock {
  ContentType: string;
  Type: string;
  CenterItem: IHighlightedNavigationBlockItem;
  LeftItem: IHighlightedNavigationBlockItem;
  RightItem: IHighlightedNavigationBlockItem;
}

export interface IHighlightedNavigationBlockProps
  extends IHighlightedNavigationBlock {}

export function HighlightedNavigationBlock(
  props: IHighlightedNavigationBlockProps
) {
  const { CenterItem, LeftItem, RightItem, Type } = props;
  const leftItem = {
    heading: LeftItem?.Heading,
    heading2: LeftItem?.Heading2,
    iconAltText: LeftItem?.Icon?.Title,
    iconUrl: LeftItem?.Icon?.Url,
    link: LeftItem?.Link,
  } as IImageRowItem;
  const centerItem = {
    heading: CenterItem?.Heading,
    heading2: CenterItem?.Heading2,
    iconAltText: CenterItem?.Icon?.Title,
    iconUrl: CenterItem?.Icon?.Url,
    link: CenterItem?.Link,
  } as IImageRowItem;
  const rightItem = {
    heading: RightItem?.Heading,
    heading2: RightItem?.Heading2,
    iconAltText: RightItem?.Icon?.Title,
    iconUrl: RightItem?.Icon?.Url,
    link: RightItem?.Link,
  } as IImageRowItem;
  const styleType = "style-1";

  return (
    <HighlightedNavigation
      leftItem={leftItem}
      centerItem={centerItem}
      rightItem={rightItem}
      styleType={Type}
    />
  );
}
