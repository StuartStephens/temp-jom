import { Col, Container, Row } from "react-bootstrap";
import {
  DonateDialogWithFormSupport,
  IACODonateDialogForm,
} from "../../../app/components/DonateDialog/DonationDialogForm";
import { ACO_DONATION_FORM } from "../../../app/contexts/utilities/FormSupport/FormFieldPropConstants";
import {
  IIFrameEmbed,
  IImage,
  IXHTMLString,
} from "../cms/types/core/CoreTypes";

export interface IACO66IntroProps {
  heading: string;
  bodyCopy: IXHTMLString;
  iframe: IIFrameEmbed;
  fallbackImage: IImage;
}

export function ACO66Intro(props: IACO66IntroProps) {
  const { heading, bodyCopy, iframe, fallbackImage } = props;
  return (
    <Container
      fluid
      className="aco-intro66 full-width bg-body-white p-1 p-md-5 "
    >
      <Container fluid className="">
        <Row>
          <Col xs={12} md={8}>
            <div className="youtube-wrapper-16x9" style={{ maxWidth: "867px" }}>
              <iframe
                width={iframe?.Width || 867}
                height={iframe?.Height || 386}
                src={iframe?.Src}
                title={iframe.Title}
                frameBorder="0"
                allow={`${
                  iframe.AutoPlay ? "autoplay" : ""
                } accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
                allowFullScreen
              ></iframe>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <DonateDialogWithFormSupport
              submitLinkText="Donate"
              defaultForm={
                {
                  productOption: undefined,
                  donationAmount: undefined,
                  monthlyPartnerAgreement: false,
                  otherAmount: undefined,
                } as IACODonateDialogForm
              }
              formConfiguration={{ formFields: ACO_DONATION_FORM }}
            >
              {/* <p>{`“With your help, we will continue to tell the world about God’s unconditional love and unending hope found in a relationship with Jesus Christ. With God’s help, you can Discover the Champion in You!” – Joel Osteen.`}</p>
              <p>{`To learn more about making a donation to Joel Osteen Ministries, visit our "Why Give?" page.`}</p> */}
            </DonateDialogWithFormSupport>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
