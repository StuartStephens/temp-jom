"use client";
import FeaturedContentCarousel from "../../../FeaturedContentCarousel";
import { IACOCarouselAdBlockProps } from "../ACOCarouselAdBlock";
import { IACOCarouselAdProps } from "../../../FeaturedContentCarousel/ACOCarouselAd";
import { ILinkItemNode } from "../../types/core/CoreTypes";

export interface IFeaturedContentCarouselBlockProps {
  CarouselAdBlocks: IACOCarouselAdBlockProps[];
}

const convertBlockToData = (
  CarouselAdBlocks: IACOCarouselAdBlockProps[]
): IACOCarouselAdProps[] => {
  const reduced: IACOCarouselAdProps[] = CarouselAdBlocks.reduce(
    (accum: IACOCarouselAdProps[], currVal: IACOCarouselAdBlockProps) => {
      const newProp: IACOCarouselAdProps = {
        copy: currVal.BodyContent,
        imageAltText: currVal.Title,
        imageUrl: currVal?.ContentImageUrl?.Url || "",
        links: [
          {
            Name: "RequestNow",
            Title: "Request Now",
            ContentLink: { Expanded: { Href: `#${currVal.id}` } },
          } as ILinkItemNode,
        ],
        contentType: currVal.ContentType,
        // backgroundImageUrl:
      };
      return [...accum, newProp];
    },
    []
  );
  return reduced;
};

export function FeaturedContentCarouselBlock(
  props: IFeaturedContentCarouselBlockProps
) {
  const { CarouselAdBlocks } = props;
  return (
    <FeaturedContentCarousel
      carouselAdProps={convertBlockToData(CarouselAdBlocks)}
    ></FeaturedContentCarousel>
  );
}
