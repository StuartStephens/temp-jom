import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IContactUsLayoutProps {
  children?: ReactNode;
}

export function ContactUsLayout(props: IContactUsLayoutProps) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"contact-us"}>{props.children}</PageLayout>
    </Container>
  );
}
