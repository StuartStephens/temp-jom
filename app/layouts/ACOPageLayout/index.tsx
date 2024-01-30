"use client";
import { Col, Container, Row } from "react-bootstrap";
// import { FormSupportProvider } from "../../utilities/FormSupport/FormSupportContext";
import { ACOBanner } from "./ACOBanner";
import { BeEncouragedBlock } from "./BeEncouragedBlock";
import { DonationForm } from "./DonationForm";
import { PageLayout } from "../PageLayout";

export interface IACOPageLayoutProps { }

// - All Channel Offer Page
// -- Masthead - of type ACO Masthead
// -- Intro 66% Block - of type ACO 66% Intro Block - has iframe embed code
// -- Offer Block - of type ACO Offer Block
// -- Signature Block - of type ACO Signature Block

export function ACOPageLayout(props: IACOPageLayoutProps) {
  return (
    <Container fluid className="">
      {/* START PAGE
      <Container>
        <Row>
          <Col xs={12} md={7}>
            VIDEO
          </Col>
          <Col xs={12} md={5} className="bg-secondary p-3">
            <FormSupportProvider
            // config={makeContextConfig(ACO_DONATION_FORM, "TODO_FILL_LATER")}
            >
              <DonationForm />
            </FormSupportProvider>
          </Col>
        </Row>
      </Container> */}
      {/* <Container>
        <Row>
          <Col xs={12} className="d-flex flex-rpw justify-content-center">
            SPECIAL OFFER WILL GO HERE
          </Col>
        </Row>
      </Container>
      <FormSupportProvider
      // config={makeContextConfig(ACO_DONATION_FORM, "TODO_FILL_LATER")}
      >
        <DonationForm />
      </FormSupportProvider>
      <Container>
        <Row>
          <Col xs={12}>
            <BeEncouragedBlock />
          </Col>
        </Row>
      </Container> */}
    </Container>
  );
}
