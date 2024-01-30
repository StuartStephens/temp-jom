"use client";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { LoginFormLayout } from "../../components/LoginForm/LoginFormLayout";
import { useAuth } from "../../contexts/Auth/Context";
import {
  IMenuState,
  useUIStateContext,
} from "../../contexts/UIStateContext/Context";
import { FormSupportProvider } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { ACOPageLayout } from "../ACOPageLayout";
import { AccountLayout } from "../AccountLayout";
import { CommunityLayout } from "../CommunityLayout";
import { WhyGiveLayout } from "../WhyGiveLayout";
import { TestEmailForm } from "./TestEMailForm";
import { DonateDialog } from "../../components/DonateDialog";
import { useSearchParams } from "next/navigation";

export interface IMainLayoutProps {
  menuStates?: IMenuState[];
}

export function MainLayout(props: IMainLayoutProps) {
  const { dispatch } = useUIStateContext();
  const searchparams = useSearchParams();
  const { menuStates } = props;

  const {
    checkIsLoggedIn,
    isLoginModalVisible,
    setIsLoginModalVisible,
    closeLoginModal,
  } = useAuth();
  const { isDonateDialogVisible, setIsDonateDialogVisible } =
    useUIStateContext();

  const [layout, setLayout] = useState("FORM_GENERATOR");

  const getButtonVariant = (layoutName: string) => {
    return layout === layoutName ? "primary" : "outline-primary";
  };

  function updateLayout(value: string) {
    localStorage.setItem("layout", value);
    setLayout(value);
  }

  useEffect(() => {
    let ulrparams = new URLSearchParams(document.location.search);
    let isLogin = ulrparams.get("isLogin");
    if (isLogin) {
      setIsLoginModalVisible(isLogin == "true");
    }
    // menuStates && dispatch({ type: "setMenuStates", payload: menuStates });
  }, [menuStates]);

  return (
    <div>
      {true || checkIsLoggedIn() ? (
        <Container
          fluid
          className="full-width d-flex flex-column "
        // data-bs-theme={currentColorMode}
        >
          {/* {isDonateDialogVisible && (
            <DonateDialog
              show={isDonateDialogVisible}
              onHide={() => setIsDonateDialogVisible(false)}
            />
          )} */}
          <Row>
            <Col>
              <Container fluid className="full-width">
                <Row>
                  <Col
                    xs={12}
                    md={10}
                    className="d-flex flex-row justify-content-center align-items-center"
                  >
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant={getButtonVariant("FORM_GENERATOR")}
                        onClick={() => updateLayout("FORM_GENERATOR")}
                      >
                        FORM GENERATOR
                      </Button>
                      <Button
                        variant={getButtonVariant("ACCOUNT")}
                        onClick={() => updateLayout("ACCOUNT")}
                      >
                        Account
                      </Button>
                      <Button
                        variant={getButtonVariant("ACO")}
                        onClick={() => updateLayout("ACO")}
                      >
                        ACO
                      </Button>

                      <Button
                        variant={getButtonVariant("COMMUNITY")}
                        onClick={() => updateLayout("COMMUNITY")}
                      >
                        Community
                      </Button>
                      <Button
                        variant={getButtonVariant("WHY_GIVE")}
                        onClick={() => updateLayout("WHY_GIVE")}
                      >
                        Why Give
                      </Button>
                    </ButtonGroup>
                  </Col>

                  {/* <Col xs={12} md={1}>
                    <LoginFormLayout />
                  </Col> */}
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container fluid className="full-width">
                {layout === "FORM_GENERATOR" && (
                  <FormSupportProvider>
                    <TestEmailForm />
                  </FormSupportProvider>
                )}
                {layout === "ACO" && <ACOPageLayout />}

                {layout === "ACCOUNT" && <AccountLayout />}

                {layout === "COMMUNITY" && <CommunityLayout />}

                {layout === "WHY_GIVE" && <WhyGiveLayout />}
              </Container>
            </Col>
          </Row>
        </Container>
      ) : (
        <FormSupportProvider
        // config={makeContextConfig(LOGIN_FORM, undefined)}
        // this is not going to work , because we should be able to access the form support context in the configuration of the callbacks to do things like update the form with the returned data from the API
        >
          <LoginFormLayout />
        </FormSupportProvider>
      )}
    </div>
  );
}
