import { Container } from "react-bootstrap";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../../../../components/shared/layouts/PageGutterLayout";

export default function DocsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <Container fluid className="full-width">
        {children}
      </Container>
    </PageGutterLayout>
  );
}
