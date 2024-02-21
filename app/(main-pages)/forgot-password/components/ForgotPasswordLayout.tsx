import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IForgotPasswordLayoutProps {
  children?: ReactNode;
}

export function ForgotPasswordLayout(props: IForgotPasswordLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"forgot-password"}>{props.children}</PageLayout>
    </Container>
  );
}
