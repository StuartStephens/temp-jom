"use client";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
export interface IDemoMenuProps {}

export function DemoMenu(props: IDemoMenuProps) {
  return (
    <Navbar expand="lg" className="bg-primary">
      <Navbar.Brand href="/demo">Component Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/demo">Demo Home</Nav.Link>
          {/* <Nav.Link href="#link">layouts</Nav.Link> */}
          <NavDropdown title="Layouts" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} href="/demo/components/multi-layout">
              <span className="text-nowrap">Multi-Column Layout</span>
              Multi-Column Layout
            </NavDropdown.Item>
            {/* <NavDropdown.Item>
              <Nav.Link
                className="px-3"
                as={Link}
                href="/demo/components/multi-layout"
              >
                <span className="text-nowrap">Multi-Column Layout</span>
              </Nav.Link>
              Multi-Column Layout
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="/demo/components/multi-layout">
              Something else
            </NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
