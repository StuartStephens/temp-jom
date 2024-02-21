import { Carousel } from "react-bootstrap";
import CarouselBlockCaptionRenderer from "./CarouselBlockCaptionRenderer";

export interface ICarouselBlockProps {
  height?: number;
}

export default function CarouselBlock(props: ICarouselBlockProps) {
  return (
    <div>
      <Carousel variant="dark" className="test-carousel">
        <Carousel.Item>
          <div className="slide" style={{ height: props.height + "px" }}>
            <Carousel.Caption>
              <CarouselBlockCaptionRenderer
                title="Think This Not That"
                link=""
                linkText="Request Now"
                imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2023-08-think-this-not-that/ttnt-carousel2.png"
                copy="This promise book will help you identify negative thoughts and replace them with positive, breakthrough thinking."
                backgroundImageUrl="https://media.istockphoto.com/id/157195387/photo/morning-at-lake-plansee.jpg?s=1024x1024&w=is&k=20&c=42uN6-RpxGEkHf8KFg3R5u0ZeTdTpS9VdYKgu1T3A_U="
              />
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="slide" style={{ height: props.height + "px" }}>
            <Carousel.Caption>
              <CarouselBlockCaptionRenderer
                title="15 Ways to Live Longer and Healthier"
                link=""
                linkText="Pre-Order"
                imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2023-10-15ways/jom-1023-aco.png"
                copy="Step into your healthiest and most abundant life. In this brand-new book, you'll receive practical strategies for increased energy, a focused mind and a calmer soul. "
                backgroundImageUrl="https://media.istockphoto.com/id/157195387/photo/morning-at-lake-plansee.jpg?s=1024x1024&w=is&k=20&c=42uN6-RpxGEkHf8KFg3R5u0ZeTdTpS9VdYKgu1T3A_U="
              />
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
