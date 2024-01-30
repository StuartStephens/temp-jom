import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

export interface IDocsLayoutProps {
  componentId: string;
  children?: ReactNode;
}

export function DocsLayout(props: IDocsLayoutProps) {
  return (
    <div>
      {props.componentId}
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={11}>
            {props.children}
            NO PROPS PANEL HERE
          </Col>
        </Row>
      </Container>
    </div>
  );
}
