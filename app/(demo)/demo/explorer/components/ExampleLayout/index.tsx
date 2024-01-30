import { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";

export interface IExampleLayoutProps {
  componentId: string;
  children: ReactNode;
}

export function ExampleLayout(props: IExampleLayoutProps) {
  return (
    <div>
      {props.componentId}
      <Container fluid className="full-width">
        <Row>
          <Col xs={12} md={10}>
            {props.children}
          </Col>
          <Col xs={12} md={2}>
            properties panel
          </Col>
        </Row>
      </Container>
    </div>
  );
}
