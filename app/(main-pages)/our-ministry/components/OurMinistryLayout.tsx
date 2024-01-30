import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IOurMinistryLayoutProps {
  children?: ReactNode;
}

export function OurMinistryLayout(props: IOurMinistryLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"our-ministry"}>{props.children}</PageLayout>
    </Container>
  );
}
