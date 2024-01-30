import { Col, Container, Row } from "react-bootstrap";

export default function AccountContactInformationPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <Container fluid className="full-width mb-2">
      <Row>
        <Col>
          <h2>Contact Information</h2>
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
