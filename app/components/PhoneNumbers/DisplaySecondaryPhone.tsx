import { Col, Container, Row } from "react-bootstrap";
import { IPhoneNumber } from "../../contexts/Auth/PhoneNumbersTypes";
import { formatPhoneNumber } from "../../contexts/utilities/FormatUtils";
import { RowActionButton } from "../../layouts/AccountLayout/RowActionButton";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

export interface IDisplaySecondaryPhoneProps {
  phoneNumber: IPhoneNumber;
  index: number;
  onToggleEdit: (phone: IPhoneNumber) => void;
  onRemove: (phone: IPhoneNumber) => void;
}

export function DisplaySecondaryPhone(props: IDisplaySecondaryPhoneProps) {
  const { phoneNumber, index, onToggleEdit, onRemove } = props;
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Container fluid className="full-width mb-2">
      <Row>
        <Col xs={12} md={3}>
          <strong>Phone {`Phone Number ${index + 1}:`}</strong>
        </Col>
        <Col xs={12} md={7}>
          {formatPhoneNumber(phoneNumber.Phone)}
        </Col>
        <Col xs={12} md={2}>
          <div className=" d-flex flex-column gap-1 ">
            <RowActionButton
              onClick={() => {
                onToggleEdit(phoneNumber);
              }}
            >
              EDIT
            </RowActionButton>
            <RowActionButton
              onClick={() => {
                setIsLoading(true);
                onRemove(phoneNumber);
              }}
            >
              REMOVE
            </RowActionButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
