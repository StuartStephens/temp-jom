import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IForgotPasswordLayoutProps {
  children?: ReactNode;
}

export function SetPasswordLayout(props: IForgotPasswordLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"set-password"}>{props.children}</PageLayout>
    </Container>
  );
}
