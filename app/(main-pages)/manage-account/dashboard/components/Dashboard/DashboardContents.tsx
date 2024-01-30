"use client";
import { Button, Col, Container, Row } from "react-bootstrap";
import Banner from "../../../../../components/shared/Banner/Banner";
import Link from "next/link";
import { useUIStateContext } from "../../../../../contexts/UIStateContext/Context";
import { JOMButtonLink } from "../../../../../components/shared/controls/JOMButtonLink";

export interface IDashboardProps { }

export function DashboardContents(props: IDashboardProps) {
  const { dispatch } = useUIStateContext();
  return (
    <Container fluid className="dashboard-layout full-width px-5">
      <Row>
        <Col
          xs={12}
          md={6}
          className="py-2 d-flex flex-column justify-content-end align-items-start"
        >
          <div className="dashboard-layout-heading d-flex flex-row justify-content-start align-items-end">
            <i className="bi bi-gift" />
            <h2>My Giving</h2>
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          className="py-2  d-flex flex-column justify-content-end align-items-end"
        >
          <JOMButtonLink href="manage-account/transaction-history">
            View Transaction History
          </JOMButtonLink>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={12}>
          <Banner
            backgroundImgUrl="http://int.joelosteen.com/globalassets/images/jom/account/donations-png.png"
            className={` generic-page-banner`}
            ariaTitle={`My Giving`}
          >
            <Container
              fluid
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Row>
                <Col className="my-2">
                  {true ? (
                    <h4>Thank you for your continued support!</h4>
                  ) : (
                    <h4>
                      Help us spread the good news of Jesus Christ around the
                      globe!
                    </h4>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link
                    href="manage-account/manage-information/manage-donations"
                    passHref
                  >
                    <Button
                      variant="outline-light"
                    // onClick={() => {
                    //   dispatch({
                    //     type: "setSelectedMenus",
                    //     payload: [
                    //       {
                    //         menuStateName: "ACCOUNT_MENU",
                    //         menuItemName: "manage-information",
                    //       },
                    //       {
                    //         menuStateName: "ACCOUNT_TERTIARY",
                    //         menuItemName: "manage-donations",
                    //       },
                    //     ],
                    //   });
                    // }}
                    >
                      Manage Recurring Donations
                    </Button>
                  </Link>
                  {/* <Button>
                    <Link href="manage-account/manage-information?initialView=manage-donations">
                      View Transaction History
                    </Link>
                  </Button> */}
                </Col>
              </Row>
            </Container>
          </Banner>
        </Col>
      </Row>
    </Container>
  );
}
