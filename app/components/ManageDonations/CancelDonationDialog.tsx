import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { getPaymentMethodDetailsHelper } from "./DonationUtils";
import {
  formatDayOfMonth,
  formatPrice,
} from "../../contexts/utilities/FormatUtils";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";

export interface ICancelDonationDialogProps {
  // type?: string;
  // idToDelete?: string;
  onCancel: (id?: string) => void;
  onConfirm: (id?: string) => void;
  show: boolean;
}

export function CancelDonationDialog(props: ICancelDonationDialogProps) {
  const { donationBeingCancelled, cancelDonation } = useAccountInfoContext();
  const { currentColorMode } = useCMColorModeProviderContext();
  return (
    <Modal
      size="lg"
      aria-labelledby="CancelDonationDialogTitle"
      centered
      data-bs-theme={currentColorMode}
      show={props.show}
      onHide={() => {
        props.onCancel();
      }}
    >
      <Modal.Header
        closeVariant="white"
        closeButton
        className=" bg-dark text-white"
        id="CancelDonationDialogTitle"
      >
        <Modal.Title>Cancel Recurring Donation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to cancel this recurring donation?</h4>

        <Container fluid className="full-width">
          {donationBeingCancelled?.church && (
            <Row>
              <Col xs={12} md={4}>
                <strong>On Behalf of: </strong>
              </Col>
              <Col xs={12} md={8}>
                <small>{donationBeingCancelled?.church?.Name}</small>
              </Col>
            </Row>
          )}

          <Row>
            <Col xs={12} md={4}>
              <strong>Amount: </strong>
            </Col>
            <Col xs={12} md={8}>
              <small>
                {donationBeingCancelled?.donation?.Amount &&
                  formatPrice(
                    donationBeingCancelled?.donation?.Amount,
                    donationBeingCancelled?.donation.Currency
                  )}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <strong>Day of Month: </strong>
            </Col>
            <Col xs={12} md={8}>
              <small>
                {donationBeingCancelled?.donation?.DayOfCharge &&
                  formatDayOfMonth(
                    donationBeingCancelled?.donation?.DayOfCharge
                  )}
              </small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <strong>Payment Method: </strong>
            </Col>
            <Col xs={12} md={8}>
              <small>
                {donationBeingCancelled?.donation?.PaymentMethod
                  ? getPaymentMethodDetailsHelper(
                      donationBeingCancelled?.donation?.PaymentMethod
                    ).summary
                  : ""}
              </small>
            </Col>
          </Row>
        </Container>

        {/* <p>{donationBeingCancelled?.donation?.Amount}</p>
        <p>{donationBeingCancelled?.donation?.DayOfCharge}</p>
        <p>
          {donationBeingCancelled?.donation?.PaymentMethod
            ? getPaymentMethodDetailsHelper(
                donationBeingCancelled?.donation?.PaymentMethod
              ).summary
            : ""}
        </p> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-primary"
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            cancelDonation();
            props.onConfirm();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
