import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IWhyGiveLayoutProps {
  children?: ReactNode;
}

export function WhyGiveLayout(props: IWhyGiveLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"why-give"}>{props.children}</PageLayout>
    </Container>
  );
}
