"use client";
import Link from "next/link";
import { Button, ButtonProps, Nav } from "react-bootstrap";
import { useAuth } from "../../../contexts/Auth/Context";
import {
  IMenuItem,
  NAV_LINK_TYPE,
  useUIStateContext,
} from "../../../contexts/UIStateContext/Context";
import { disableMenu, showMenu } from "./MenuUtils";
import { JOMButtonLink } from "../../shared/controls/JOMButtonLink";

export interface IMainMenuLinkProps {
  menuItem: IMenuItem;
}

export function MainMenuLink(props: IMainMenuLinkProps) {
  const { openLoginModal, logout, checkIsLoggedIn, contactInfo } = useAuth();
  const { setIsDonateDialogVisible } = useUIStateContext();
  const { menuItem } = props;

  switch (menuItem.LinkType) {
    case NAV_LINK_TYPE.SEARCH:
      return showMenu(menuItem, contactInfo) ? (
        <>
          <Nav.Link
            as={JOMButtonLink}
            buttonProps={{
              className:
                "d-none d-md-block text-white p-3 p-md-0 mx-2 fw-normal fs-6",
            }}
            eventKey={menuItem.Name}
            active={menuItem?.IsSelected}
            href={menuItem?.Href || ""}
            disabled={disableMenu(menuItem, contactInfo)}
          >
            <i className="bi bi-search pe-3 " />
          </Nav.Link>
          <input
            className="d-block d-md-none ms-4"
            type="text"
            name="site-search"
            placeholder="Search"
          />
        </>
      ) : null;
      break;
    case NAV_LINK_TYPE.CART:
      return showMenu(menuItem, contactInfo) ? (
        <Nav.Link
          as={ToolsButton}
          eventKey={menuItem.Name}
          active={menuItem?.IsSelected}
          onClick={() => {
            if (checkIsLoggedIn()) {
              setIsDonateDialogVisible(true);
            } else {
              openLoginModal("/home-page?donate=true");
            }
          }}
          disabled={disableMenu(menuItem, contactInfo)}
        >
          {menuItem.Text}
        </Nav.Link>
      ) : null;
      break;
    case NAV_LINK_TYPE.DONATE:
      return showMenu(menuItem, contactInfo) ? (
        <Nav.Link
          as={ToolsButton}
          eventKey={menuItem.Name}
          active={menuItem?.IsSelected}
          onClick={() => {
            if (checkIsLoggedIn()) {
              setIsDonateDialogVisible(true);
            } else {
              openLoginModal("/home-page?donate=true");
            }
          }}
          disabled={disableMenu(menuItem, contactInfo)}
        >
          {menuItem.Text}
        </Nav.Link>
      ) : null;
      break;
    case NAV_LINK_TYPE.LOGIN:
      return showMenu(menuItem, contactInfo) ? (
        <Nav.Link
          as={ToolsButton}
          eventKey={menuItem.Name}
          active={menuItem?.IsSelected}
          onClick={() => {
            openLoginModal();
          }}
          // href="/home?isLogin=true"
          disabled={disableMenu(!menuItem, contactInfo)}
        >
          {menuItem.Text}
        </Nav.Link>
      ) : null;
      break;
    case NAV_LINK_TYPE.LOGOUT:
      return showMenu(menuItem, contactInfo) ? (
        <Nav.Link
          as={ToolsButton}
          eventKey={menuItem.Name}
          active={menuItem?.IsSelected}
          onClick={() => {
            logout();
          }}
          disabled={disableMenu(menuItem, contactInfo)}
        >
          {menuItem.Text}
        </Nav.Link>
      ) : null;
      break;
    default:
      return showMenu(menuItem, contactInfo) ? (
        <Nav.Link
          as={Link}
          eventKey={menuItem.Name}
          active={menuItem?.IsSelected}
          href={menuItem?.Href || ""}
          disabled={disableMenu(menuItem, contactInfo)}
        >
          {menuItem.Text}
        </Nav.Link>
      ) : // <Link href={menuItem?.Href || ""}>{menuItem.Text}</Link>
      null;
      break;
  }
  return null;
}

export function ToolsButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      variant="jombutton"
      className="text-white p-3 p-md-0 mx-2 fw-normal fs-6"
    >
      {props.children}
    </Button>
  );
}
