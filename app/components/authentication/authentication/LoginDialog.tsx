"use client";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useCMColorModeProviderContext } from "../../contexts/ColorModeContext/CMColorModeContext";
import { useUIStateContext } from "../../contexts/UIStateContext/Context";
import { FormSupportProvider } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { LoginFormLayout } from "../LoginForm/LoginFormLayout";
import { MENU_TYPE, Menu } from "../navigation/Menu";
import { CreateAnAccountLayout } from "./CreateAnAccountLayout";

export function LoginDialog({ ...props }) {
  const { currentColorMode } = useCMColorModeProviderContext();
  const [selectedTab, setSelectedTab] = useState("login-dialog-signin");
  const { dispatch } = useUIStateContext();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      data-bs-theme={currentColorMode}
    >
      <Modal.Header
        closeVariant="white"
        closeButton
        className=" bg-dark text-white"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Site Access
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Menu
          menuStateName="state-login-dialog"
          level={2}
          menuType={MENU_TYPE.TAB_MENU}
          onMenuSelect={(eventKey: string) => {
            dispatch({
              type: "setSelectedMenus",
              payload: [
                { menuStateName: "state-login-dialog", menuItemName: eventKey },
              ],
            });
            setSelectedTab(eventKey);
          }}
        ></Menu>
      </Modal.Body>
      <Modal.Body className="page-gutter page-gutter-small">
        {!selectedTab ||
          (selectedTab === "login-dialog-signin" && (
            <FormSupportProvider>
              <LoginFormLayout />
            </FormSupportProvider>
          ))}

        {selectedTab == "login-dialog-create-account" && (
          <FormSupportProvider>
            <CreateAnAccountLayout />
          </FormSupportProvider>
        )}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
