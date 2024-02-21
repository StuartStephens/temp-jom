"use client";
import { Button, Card, Container, Image } from "react-bootstrap";

export interface ISocialPostsContainerBlockProps {}

export function SocialPostsContainerBlock(
  props: ISocialPostsContainerBlockProps
) {
  return (
    <Container
      fluid
      className="pt-5 full-width d-flex flex-column flex-wrap align-items-center standard-content"
    >
      <h3 className="pb-3">
        <strong>Instagram</strong>
      </h3>
      <p className="copy pb-3 text-center text-md-start">
        Follow Joel Osteen Ministries on Instagram. Inspiring people to reach
        their dreams and live their best life.
      </p>
      <Container
        fluid
        className="d-flex full-width flex-column flex-md-row flex-wrap flex-md-nowrap justify-content-center gap-1 "
      >
        <Card onClick={() => alert("clicked")}>
          <Card.Body className="instagram-card p-0">
            <Image src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg" />
          </Card.Body>
        </Card>
        <Card onClick={() => alert("clicked")}>
          <Card.Body className="instagram-card p-0">
            <Image src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg" />
          </Card.Body>
        </Card>
        <Card onClick={() => alert("clicked")}>
          <Card.Body className="instagram-card p-0">
            <Image src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg" />
          </Card.Body>
        </Card>
        <Card onClick={() => alert("clicked")}>
          <Card.Body className="instagram-card p-0">
            <Image src="https:joelosteen.com/globalassets/images/jom/home/instagram-images/october-2020-instagram/122166134_276896973523956_2881414184818523959_n.jpg" />
          </Card.Body>
        </Card>
      </Container>
      <div className="button-row pb-5">
        <Button variant="outline-dark">Follow</Button>
      </div>
    </Container>
  );
}
