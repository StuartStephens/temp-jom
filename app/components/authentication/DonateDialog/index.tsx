"use client";
import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";
import { ACO_DONATION_FORM } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import {
  DonateDialogWithFormSupport,
  IACODonateDialogForm,
} from "./DonationDialogForm";
import { ILinkItemNode } from "../../../app/components/cms/types/core/CoreTypes";

export function DonateDialog({ ...props }) {
  const { currentColorMode } = useCMColorModeProviderContext();
  const [selectedTab, setSelectedTab] = useState("donate-dialog-signin");
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme="light"
      // data-bs-theme={currentColorMode}
    >
      <Modal.Header
        closeVariant="white"
        closeButton
        className=" bg-dark text-white"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          How Much Would You Like to Give Today?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="page-gutter page-gutter-small">
          <DonateDialogWithFormSupport
            defaultForm={
              {
                productOption: undefined,
                donationAmount: undefined,
                monthlyPartnerAgreement: false,
                otherAmount: undefined,
              } as IACODonateDialogForm
            }
            formConfiguration={{ formFields: ACO_DONATION_FORM }}
            links={[{ Href: "/why-give", Title: "Why Give" } as ILinkItemNode]}
            submitLinkText="Proceed to Giving"
          >
            <p>{`“With your help, we will continue to tell the world about God’s unconditional love and unending hope found in a relationship with Jesus Christ. With God’s help, you can Discover the Champion in You!” – Joel Osteen.`}</p>
            <p>{`To learn more about making a donation to Joel Osteen Ministries, visit our "Why Give?" page.`}</p>
          </DonateDialogWithFormSupport>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
