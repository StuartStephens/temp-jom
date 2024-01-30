"use client";
import { Container, Nav, Navbar, NavbarProps } from "react-bootstrap";
import { MainMenuLink } from "./MainMenuLink";
import { IMenuItem } from "../../contexts/UIStateContext/Context";
import { UserSettings } from "../../components/LoginForm/UserSettings";

export interface IMainMenuProps
    extends NavbarProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    menuItems: IMenuItem[];
    isLoggedIn: boolean;
}

export function MainMenu(props: IMainMenuProps) {
    const { menuItems, isLoggedIn } = props;
    return (
        <>
            <Navbar
                collapseOnSelect
                sticky="top"
                className="bg-primary main-navbar mb- p-0"
                expand="xl"
            >
                <Container
                    fluid
                    className="full-width pt-0  d-flex align-items-center align-items-xl-end  "
                >
                    {props.children}

                    <Navbar.Collapse id="basic-navbar-nav  ">
                        <Container fluid className="full-width pt-3 d-flex flex-column">
                            <Nav className="me-auto bg-transparent order-2 order-xl-1 w-100">
                                <Container
                                    fluid
                                    className="full-width d-flex flex-column flex-xl-row  justify-content-start justify-content-xl-evenly pl-4 text-uppercase font-weight-bold"
                                >
                                    {menuItems &&
                                        menuItems
                                            .filter((menuItem: IMenuItem) => !menuItem.IsTool)
                                            .map((menuItem: IMenuItem) => {
                                                return (
                                                    <MainMenuLink
                                                        isLoggedIn={isLoggedIn}
                                                        key={`LINK_${menuItem.Name}`}
                                                        menuItem={menuItem}
                                                    />
                                                );
                                            })}
                                    <UserSettings />
                                </Container>
                            </Nav>

                            <Nav className="me-auto bg-transparent main-navbar-tool  order-1 order-xl-2  w-100">
                                <Container
                                    fluid
                                    className="full-width d-flex flex-column flex-xl-row justify-content-start justify-content-xl-end pl-4 text-uppercase "
                                >
                                    {menuItems &&
                                        menuItems
                                            .filter((menuItem: IMenuItem) => !!menuItem.IsTool)
                                            .map((menuItem: IMenuItem) => {
                                                return (
                                                    <MainMenuLink
                                                        isLoggedIn={isLoggedIn}
                                                        key={`TOOL_${menuItem.Name}`}
                                                        menuItem={menuItem}
                                                    />
                                                );
                                            })}
                                </Container>
                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
