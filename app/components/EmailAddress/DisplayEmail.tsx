import { Col, Container, Row } from "react-bootstrap";
import { IEmailAddress } from "../../contexts/Auth/EmailAddressTypes";
import { RowActionButton } from "../../layouts/AccountLayout/RowActionButton";
import { DisplayPrimaryEmail } from "./DisplayPrimaryEmail";
import { useState } from "react";
import { LoadingSpinner } from "../LoadingSpinner";

export interface IDisplayEmailProps {
  emailAddress: IEmailAddress;
  index: number;
  onToggleEdit: (emailAddress: IEmailAddress) => void;
  onRemove: (emailAddress: IEmailAddress) => void;
}

export function DisplayEmail(props: IDisplayEmailProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { emailAddress, index, onToggleEdit, onRemove } = props;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {emailAddress.IsPrimary ? (
        <DisplayPrimaryEmail emailAddress={emailAddress} />
      ) : (
        <Container fluid className="full-width mb-2">
          <Row>
            <Col xs={12} md={3}>
              <strong>Email Address {index + 1}:</strong>
            </Col>
            <Col xs={12} md={7}>
              {emailAddress.Email}
            </Col>
            <Col xs={12} md={2}>
              <div className=" d-flex flex-column gap-1 ">
                <RowActionButton
                  onClick={() => {
                    onToggleEdit(emailAddress);
                  }}
                >
                  EDIT
                </RowActionButton>
                <RowActionButton
                  onClick={() => {
                    setIsLoading(true);
                    onRemove(emailAddress);
                  }}
                >
                  REMOVE
                </RowActionButton>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
