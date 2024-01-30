import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IWatchLayoutProps {
  children?: ReactNode;
}

export function WatchLayout(props: IWatchLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"watch"}>{props.children}</PageLayout>
    </Container>
  );
}
