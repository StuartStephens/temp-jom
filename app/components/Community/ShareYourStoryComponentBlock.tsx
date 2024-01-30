import { Button, Container } from "react-bootstrap";

export interface IShareYourStoryComponentBlockProps {}

export function ShareYourStoryComponentBlock(
  props: IShareYourStoryComponentBlockProps
) {
  return (
    <Container
      fluid
      className=" px-1 mb-5 px-md-5  align-items-center standard-content horizontal-divider black"
    >
      <Container
        fluid
        className="bg-white bg-md-transparent m-3 p-3 d-flex flex-column"
      >
        <h2 className=" text-center">Have a story of Victory to share?</h2>
        <p className="copy   text-center">
          One of the greatest gifts one can give is sharing our faith with
          others while expressing gratitude to God. We would love to hear what
          incredible things God has done for you and the many ways He has
          changed your life! Your story will be a blessing for many who need
          inspiration and encouragement.
        </p>
        <div className="button-row   text-center">
          <Button variant="primary">Share Your Story</Button>
        </div>
      </Container>
    </Container>
  );
}
