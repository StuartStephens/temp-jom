"use client";
import { Container, Nav, Navbar, NavbarProps } from "react-bootstrap";
import { IMenuItem } from "../../../contexts/UIStateContext/Context";
import { UserSettings } from "../../LoginForm/UserSettings";
import { MainMenuLink } from "./MainMenuLink";

export interface IMainMenuProps
  extends NavbarProps,
    Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  menuItems: IMenuItem[];
}

export function MainMenu(props: IMainMenuProps) {
  const { menuItems } = props;

  return (
    <>
      <Navbar
        collapseOnSelect
        sticky="top"
        className="bg-primary main-navbar mb- p-0"
        expand="md"
      >
        <Container
          fluid
          className="full-width pt-0  d-flex align-items-center align-items-md-end  "
        >
          {props.children}

          <Navbar.Collapse id="basic-navbar-nav  ">
            <Container fluid className="full-width pt-0 d-flex flex-column">
              <Nav className="p-0 p-md-3 me-auto bg-transparent order-2 order-md-1 w-100">
                <Container
                  fluid
                  className="ps-0 ps-md-4 full-width d-flex flex-column flex-md-row  justify-content-start justify-content-md-evenly  align-items-start align-items-md-end  text-uppercase font-weight-bold"
                >
                  {menuItems &&
                    menuItems
                      .filter((menuItem: IMenuItem) => !menuItem.IsTool)
                      .map((menuItem: IMenuItem) => {
                        return (
                          <MainMenuLink
                            key={`LINK_${menuItem.Name}`}
                            menuItem={menuItem}
                          />
                        );
                      })}
                  <div className="d-none d-md-block">
                    <UserSettings />
                  </div>
                </Container>
              </Nav>

              <Nav className="bg-secondary p-1 me-auto  main-navbar-tool  order-1 order-md-2  w-100">
                <Container
                  fluid
                  className="full-width d-flex flex-column flex-md-row justify-content-evenly justify-content-md-end align-items-start align-items-md-stretch ps-4  text-uppercase "
                >
                  <div className="d-block d-md-none">
                    <UserSettings />
                  </div>
                  {menuItems &&
                    menuItems
                      .filter((menuItem: IMenuItem) => !!menuItem.IsTool)
                      .map((menuItem: IMenuItem) => {
                        return (
                          <MainMenuLink
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
