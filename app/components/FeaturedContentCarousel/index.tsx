"use client";
import { Carousel, CarouselItem } from "react-bootstrap";
import { ACOCarouselAd, IACOCarouselAdProps } from "./ACOCarouselAd";

export interface IFeaturedContentCarouselBlockProps {
  carouselAdProps: IACOCarouselAdProps[];
}

export default function FeaturedContentCarousel(
  props: IFeaturedContentCarouselBlockProps
) {
  const { carouselAdProps } = props;
  return (
    <Carousel variant="dark" className="featured-carousel-block">
      {carouselAdProps &&
        carouselAdProps.map((ad: IACOCarouselAdProps, index) => {
          return (
            <CarouselItem key={"CarouselItem_" + ad?.title + "_i_" + index}>
              <ACOCarouselAd
                title={ad?.title}
                imageAltText={ad?.imageAltText}
                links={ad?.links}
                imageUrl={ad?.imageUrl}
                copy={ad?.copy}
                contentType={ad.contentType}
              />
            </CarouselItem>
          );
        })}
      {/* <CarouselItem>
          <ACOCarouselAd
            title="Think This Not That"
            imageAltText="Think This Not That"
            links={[
              { Title: "Request Now", Href: "#REQUEST NOW" } as ILinkItemNode,
            ]}
            imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2023-08-think-this-not-that/ttnt-carousel2.png"
            copy="This promise book will help you identify negative thoughts and replace them with positive, breakthrough thinking."
          />
        </CarouselItem>
        <CarouselItem>
          <ACOCarouselAd
            key={`add_2`}
            title="15 Ways to Live Longer and Healthier"
            imageAltText="15 Ways to Live Longer and Healthier"
            links={[
              { Title: "Request Now", Href: "#REQUEST NOW" } as ILinkItemNode,
            ]}
            imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2023-10-15ways/jom-1023-aco.png"
            copy="Step into your healthiest and most abundant life. In this brand-new book, you'll receive practical strategies for increased energy, a focused mind and a calmer soul. "
          />
        </CarouselItem> */}
    </Carousel>
  );
}
