// import {
//   PAGE_GUTTER,
//   PageGutterLayout,
// } from "../../../components/shared/layouts/PageGutterLayout";
// import { ComponentTree } from "./components/ComponentTree";

import { Col, Container, Row } from "react-bootstrap";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../components/shared/layouts/PageGutterLayout";
import { ComponentTree } from "./components/ComponentTree";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={2}>
            <ComponentTree />
          </Col>
          <Col xs={12} md={10}>
            {children}
          </Col>
        </Row>
      </Container>
    </PageGutterLayout>
  );
}
