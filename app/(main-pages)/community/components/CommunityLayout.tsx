import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface ICommunityLayoutProps {
  children?: ReactNode;
}

export function CommunityLayout(props: ICommunityLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"community"}>{props.children}</PageLayout>
    </Container>
  );
}
