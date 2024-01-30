import { Col, Container, Row } from "react-bootstrap";
import { IAddressForm } from "../components/AddressForm";

export interface IStoredAddressesProps {
  form?: IAddressForm;
}

export function AddressDisplay({ form }: IStoredAddressesProps) {
  return form ? (
    <>
      {(form.firstName || form.lastName) && (
        <Container>
          <Row>
            <Col>{`${form.firstName} ${form.lastName}`}</Col>
          </Row>
        </Container>
      )}

      <Container>
        <Row>
          <Col>{form.address1}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{form.address2}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{`${form.city},  ${form.state} ${form.zipCode} `}</Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>{form.country}</Col>
        </Row>
      </Container>
    </>
  ) : null;
}
