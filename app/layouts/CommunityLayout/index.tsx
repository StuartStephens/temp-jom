"use client";
import { Button, Card, Container, Image } from "react-bootstrap";
import { LatestBlogsBlock } from "../../components/planned_for_deletion/LatestBlogsBlock";

export function CommunityLayout() {
  return (
    <div>
      <Container className="py-5 px-1 mb-5 px-md-5 d-flex flex-column align-items-center standard-content">
        <h3 className="pb-3">Instagram</h3>
        <p className="copy pb-3">
          Follow Joel Osteen Ministries on Instagram. Inspiring people to reach
          their dreams and live their best life.
        </p>
        <Container className="page-gutter d-flex flex-row gap-5 pb-3">
          <Card onClick={() => alert("clicked")} role="link">
            <Card.Body className="p-0">
              <Image
                src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg"
                height="297"
              />
            </Card.Body>
          </Card>
          <Card onClick={() => alert("clicked")} role="link">
            <Card.Body className="p-0">
              <Image
                src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg"
                height="297"
              />
            </Card.Body>
          </Card>
          <Card onClick={() => alert("clicked")} role="link">
            <Card.Body className="p-0">
              <Image
                src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg"
                height="297"
              />
            </Card.Body>
          </Card>
          <Card onClick={() => alert("clicked")} role="link">
            <Card.Body className="p-0">
              <Image
                src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg"
                height="297"
              />
            </Card.Body>
          </Card>
        </Container>
        <div className="button-row pb-5">
          <Button variant="outline-dark">Follow</Button>
        </div>
      </Container>

      <Container className="py-5 px-1 mb-5 px-md-5 d-flex flex-column align-items-center standard-content horizontal-divider">
        <h2 className="pb-3">Have a story of Victory to share?</h2>
        <p className="copy pb-3">
          Follow Joel Osteen Ministries on Instagram. Inspiring people to reach
          their dreams and live their best life.
        </p>
        <div className="button-row pb-5">
          <Button variant="outline-dark">Follow</Button>
        </div>
      </Container>

      <div
        className="py-5 px-1 mb-5 px-md-5"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "none",

          backgroundImage:
            "url('https://media.istockphoto.com/id/157195387/photo/morning-at-lake-plansee.jpg?s=1024x1024&w=is&k=20&c=42uN6-RpxGEkHf8KFg3R5u0ZeTdTpS9VdYKgu1T3A_U=') ",
        }}
      >
        <LatestBlogsBlock />
      </div>

      {/* <div style={{ marginLeft: "200px", marginRight: "200px" }}>
        <CarouselBlockCaptionRenderer
          title="15 Ways to Live Longer and Healthier"
          link=""
          linkText="Pre-Order"
          imageUrl="https://www.joelosteen.com/globalassets/images/jom/allchanneloffers/2023-10-15ways/jom-1023-aco.png"
          copy="Step into your healthiest and most abundant life. In this brand-new book, you'll receive practical strategies for increased energy, a focused mind and a calmer soul. "
          backgroundImageUrl="https://media.istockphoto.com/id/157195387/photo/morning-at-lake-plansee.jpg?s=1024x1024&w=is&k=20&c=42uN6-RpxGEkHf8KFg3R5u0ZeTdTpS9VdYKgu1T3A_U="
        />
      </div>
      <CarouselBlock height={300} /> */}
    </div>
  );
}
