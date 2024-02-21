import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IPrivacyPolicyLayoutProps {
  children?: ReactNode;
}

export function PrivacyPolicyLayout(props: IPrivacyPolicyLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"privacy-policy"}>{props.children}</PageLayout>
    </Container>
  );
}
