import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface ISearchLayoutProps {
  children?: ReactNode;
}

export function SearchLayout(props: ISearchLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"search"}>{props.children}</PageLayout>
    </Container>
  );
}
