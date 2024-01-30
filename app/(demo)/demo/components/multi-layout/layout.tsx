import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div>ss{children}ss</div>;
}
