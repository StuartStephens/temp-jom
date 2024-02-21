import { Button, Container } from "react-bootstrap";

export interface IFacebookShareBlockProps {}

export function FacebookShareBlock(props: IFacebookShareBlockProps) {
  return (
    <Container fluid className="full-width">
      <Container
        fluid
        className="facebook-block p-5 d-flex flex-column align-items-center"
      >
        <h3>
          <strong>On Facebook</strong>
        </h3>
        <div>
          <p className="copy facebook-copy">
            You have to be honest with yourself. Maybe there are some bitter
            roots you need to pull up. You’ve allowed offenses to stay. That’s
            okay. Today can be the uprooting day. Today can be the day you let
            things go. You can forgive who hurt you, not focus on what they did,
            not be obsessed over who’s not celebrating you, living to prove to
            them who you are. You have nothing to prove. God is proud of you.
            God is cheering you on. He’s going to make up for the wrongs. Hurts
            come, but God heals. Unfair things happen, but God pays you back. We
            all have some ashes, but God gives you beauty for the ashes. Now, do
            your part and keep the offenses out. Develop this habit of letting
            go and reaching forward. Live in a continual state of forgiveness.
          </p>
        </div>
      </Container>
      <Container
        fluid
        className="facebook-block pb-5 d-flex flex-column align-items-center horiz-divider-dark"
      >
        <div>
          <span>Joel Osteen</span>
          <span>Tuesday, September 19, 20203 6:10am</span>
        </div>
        <div className="button-row">
          <Button variant="primary">View Post</Button>
        </div>
      </Container>
    </Container>
  );
}
