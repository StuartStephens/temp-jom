// import {
//   PAGE_GUTTER,
//   PageGutterLayout,
// } from "../../../components/shared/layouts/PageGutterLayout";
// import { ComponentTree } from "./components/ComponentTree";

import { Col, Container, Row } from "react-bootstrap";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../../components/shared/layouts/PageGutterLayout";
import { ExampleContents } from "../../components/ExampleContents";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { PropertiesPanel } from "../../components/PropertiesPanel";

export default function ExampleLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={9}>
            <ExampleContents componentId={params.slug} />
          </Col>
          <Col xs={12} md={3}>
            <PropertiesPanel componentId={params.slug} />
          </Col>
        </Row>
      </Container>
    </PageGutterLayout>
  );
}
