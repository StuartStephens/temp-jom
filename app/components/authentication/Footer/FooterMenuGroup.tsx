import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { ILinkItemNode } from "../cms/types/core/CoreTypes";
import Link from "next/link";

export interface IFooterMenuGroupProps {
  title: string;
  links?: ILinkItemNode[];
}

export function FooterMenuGroup(props: IFooterMenuGroupProps) {
  const { title, links } = props;
  return (
    <div className="footer-menu-group">
      <Navbar expand="md" className="bg-body-dark" variant="dark">
        <Container className="text-center text-md-start ">
          <Navbar.Brand
            href={(links && links[0] && links[0].Href) || "#"}
            className="d-block d-md-none w-100"
          >
            <strong>{title}</strong>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav">
            <i className="bi bi-chevron-down"></i>
          </Navbar.Toggle> */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-column">
              <Nav.Item>
                <Nav.Link
                  href={(links && links[0] && links[0].Href) || "#"}
                  className="fs-6"
                >
                  <strong>{title}</strong>
                </Nav.Link>
              </Nav.Item>
              {links &&
                links.map((menuitem: ILinkItemNode) => {
                  return (
                    <Nav.Link
                      key={menuitem.Title}
                      href={menuitem.Href}
                      className="text-nowrap text-truncate text-normal "
                      title={menuitem.Title}
                    >
                      <small> {menuitem.Title}</small>
                    </Nav.Link>
                  );
                })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
