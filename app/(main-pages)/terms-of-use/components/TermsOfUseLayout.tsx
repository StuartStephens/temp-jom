import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface ITermsOfUsePolicyLayoutProps {
  children?: ReactNode;
}

export function TermsOfUsePolicyLayout(props: ITermsOfUsePolicyLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"terms-of-use"}>{props.children}</PageLayout>
    </Container>
  );
}
