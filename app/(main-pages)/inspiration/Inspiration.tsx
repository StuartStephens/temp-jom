import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../PageViews/PageLayout";

export interface IOurMinistryProps {
  children: ReactNode;
}

export function Inspiration(props: IOurMinistryProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"inspiration"}>{props.children}</PageLayout>
    </Container>
  );
}
