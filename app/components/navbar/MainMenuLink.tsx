"use client";
import Link from "next/link";
import { Button, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/Auth/Context";
import { disableMenu, showMenu } from "./MenuUtils";
import {
    IMenuItem,
    NAV_LINK_TYPE,
    useUIStateContext,
} from "../../contexts/UIStateContext/Context";

export interface IMainMenuLinkProps {
    menuItem: IMenuItem;
    isLoggedIn: boolean;
}

export function MainMenuLink(props: IMainMenuLinkProps) {
    const { openLoginModal, logout, checkIsLoggedIn } = useAuth();
    const { setIsDonateDialogVisible } = useUIStateContext();
    const { menuItem, isLoggedIn } = props;

    switch (menuItem.LinkType) {
        case NAV_LINK_TYPE.SEARCH:
            return showMenu(isLoggedIn, menuItem) ? (
                <Nav.Link
                    as={Link}
                    eventKey={menuItem.Name}
                    active={menuItem?.IsSelected}
                    href={menuItem?.Href || ""}
                    disabled={disableMenu(isLoggedIn, menuItem)}
                >
                    <i className="bi bi-search pe-3 " />
                </Nav.Link>
            ) : null;
            break;
        case NAV_LINK_TYPE.CART:
        //Fall thru
        case NAV_LINK_TYPE.DONATE:
            return showMenu(isLoggedIn, menuItem) ? (
                <Nav.Link
                    as={Button}
                    eventKey={menuItem.Name}
                    active={menuItem?.IsSelected}
                    onClick={() => {
                        if (checkIsLoggedIn()) {
                            setIsDonateDialogVisible(true);
                        } else {
                            openLoginModal("/home-page?donate=true");
                        }
                    }}
                    disabled={disableMenu(isLoggedIn, menuItem)}
                >
                    {menuItem.Text}
                </Nav.Link>
            ) : null;
            break;
        case NAV_LINK_TYPE.LOGIN:
            return showMenu(isLoggedIn, menuItem) ? (
                <Nav.Link
                    as={Button}
                    eventKey={menuItem.Name}
                    active={menuItem?.IsSelected}
                    onClick={() => {
                        openLoginModal();
                    }}
                    // href="/home?isLogin=true"
                    disabled={disableMenu(!isLoggedIn, menuItem)}
                >
                    {menuItem.Text}
                </Nav.Link>
            ) : null;
            break;
        case NAV_LINK_TYPE.LOGOUT:
            return showMenu(isLoggedIn, menuItem) ? (
                <Nav.Link
                    as={Button}
                    eventKey={menuItem.Name}
                    active={menuItem?.IsSelected}
                    onClick={() => {
                        logout();
                    }}
                    disabled={disableMenu(isLoggedIn, menuItem)}
                >
                    {menuItem.Text}
                </Nav.Link>
            ) : null;
            break;
        default:
            return showMenu(isLoggedIn, menuItem) ? (
                <Nav.Link
                    as={Link}
                    eventKey={menuItem.Name}
                    active={menuItem?.IsSelected}
                    href={menuItem?.Href || ""}
                    disabled={disableMenu(isLoggedIn, menuItem)}
                >
                    {menuItem.Text}
                </Nav.Link>
            ) : // <Link href={menuItem?.Href || ""}>{menuItem.Text}</Link>
                null;
            break;
    }
    return null;
}
