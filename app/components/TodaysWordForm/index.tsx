import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Banner, { IBannerProps } from "../shared/Banner/Banner";
import { IXHTMLString } from "../cms/types/core/CoreTypes";
import { XHTMLRenderer } from "../shared/XHTMLRenderer";
import { InspirationalMessage } from "../InspirationalMessage";

export interface ITodaysWordForm {
  name: string;
  description: IXHTMLString;
  emailAddressFieldLabel: string;
  emailAddressFieldRequired: boolean;
  lastNameFieldLabel: string;
  lastNameFieldRequired: boolean;
  firstNameFieldLabel: string;
  firstNameFieldRequired: boolean;
  formSubmissionFailureMessage: string;
  formSubmissionSuccessMessage: string;
  startPublishDate: string;
  endPublishDate: string;
  status: string;
}

export interface IDailyDevotional {
  title: string;
  name: string;
  content: IXHTMLString;
  prayer: IXHTMLString;
  date: string;
  description: IXHTMLString;
  scripture: IXHTMLString;
  scriptureSource: string;
}

export interface ITodaysWordFormProps {
  bannerProps: IBannerProps;
  dailyDevotional?: IDailyDevotional;
  todaysWordFormProps: ITodaysWordForm;
}

export function TodaysWordForm(props: ITodaysWordFormProps) {
  const { bannerProps, dailyDevotional, todaysWordFormProps } = props;
  const backgroundClass = bannerProps?.backgroundImgUrl
    ? ""
    : "todays-word-form-no-devotion";

  return (
    <Banner
      className={`todays-word-banner pt-2 pb-2 standard-content todays-word-form  ${
        dailyDevotional ? "" : "todays-word-form-no-devotion"
      }`}
      backgroundImgUrl={bannerProps?.backgroundImgUrl}
      ariaTitle={bannerProps.ariaRole}
      //imageUrl={`fix this`}
    >
      <Container
        fluid
        className={`full-width ${
          true || dailyDevotional ? "mt-5 mb-5 pb-5" : "mt-3 mb-3 pb-3"
        }`}
      >
        <Row>
          <Col>
            {dailyDevotional && (
              <Container
                fluid
                className="py-3 d-flex flex-column page-gutter align-items-center"
              >
                <h2 className="mb-1 mt-3">{dailyDevotional?.title}</h2>

                <p className="mb-3 mt-0">
                  {todaysWordFormProps?.name}: {dailyDevotional?.date}
                </p>
                <div className="truncate-4-lines">
                  <XHTMLRenderer xhtml={dailyDevotional?.content} />
                </div>
              </Container>
            )}
            <Container
              fluid
              className={`${
                dailyDevotional ? "horizontal-divider white pt-5" : "pt-1"
              }  d-flex flex-column page-gutter `}
            >
              <Row>
                <Col xs={12} className="text-center caption truncate-4-lines">
                  {todaysWordFormProps?.description && (
                    <p>
                      <XHTMLRenderer xhtml={todaysWordFormProps?.description} />
                    </p>
                  )}
                </Col>
              </Row>
            </Container>

            <Form className="page-gutter row align-items-end ">
              <Form.Group
                as={Col}
                className="col-12 col-lg-3  mt-3"
                controlId="firstName"
              >
                <Form.Label className="text-white">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="col-12 col-lg-3  mt-3"
                controlId="lastName"
              >
                <Form.Label className="text-white">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="col-12 col-lg-3  mt-3"
                controlId="emailAddress"
              >
                <Form.Label className="text-white">Email Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email Address"
                  name="emailAddress"
                />
              </Form.Group>

              {/* TODO: wire submit button */}
              <Col className="col-12 col-lg-3 mt-3">
                <div className="button-row ">
                  <Button className="w-100" variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </Banner>
  );
}
