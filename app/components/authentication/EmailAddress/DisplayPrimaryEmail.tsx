import { Col, Container, Row } from "react-bootstrap";
import { IEmailAddress } from "../../apis/Account/EmailAddressTypes";

export interface IDisplayPrimaryEmailProps {
  emailAddress: IEmailAddress;
}

export function DisplayPrimaryEmail(props: IDisplayPrimaryEmailProps) {
  const { emailAddress } = props;
  return emailAddress ? (
    <Container fluid className="full-width mb-2 pb-2 border-bottom">
      <Row>
        <Col xs={12} md={4} className="mb-2">
          <strong>Primary Email Address:</strong>
        </Col>
        <Col xs={12} md={8}>
          {emailAddress.Email}
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <small>
            This is the email address you will be using to log in to
            JoelOsteen.com.
          </small>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>No Primary Email is set</Container>
  );
}
