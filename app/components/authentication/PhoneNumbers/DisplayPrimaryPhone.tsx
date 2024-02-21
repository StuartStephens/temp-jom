import { Col, Container, Row } from "react-bootstrap";
import { formatPhoneNumber } from "../../contexts/utilities/FormatUtils";
import { IPhoneNumber } from "../../contexts/Auth/PhoneNumbersTypes";

export interface IDisplayPrimaryPhoneProps {
  phoneNumber: IPhoneNumber;
}

export function DisplayPrimaryPhone(props: IDisplayPrimaryPhoneProps) {
  const { phoneNumber } = props;
  return (
    <Container fluid className="full-width mb-2 border-bottom">
      <Row>
        <Col xs={12} md={3}>
          <strong>Primary Phone:</strong>
        </Col>
        <Col xs={12} md={9}>
          {formatPhoneNumber(phoneNumber.Phone)}
        </Col>
      </Row>
    </Container>
  );
}
