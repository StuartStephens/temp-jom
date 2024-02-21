import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../PageViews/PageLayout";

export interface IReturnsAndExchangePolicyLayoutProps {
  children?: ReactNode;
}

export function ReturnsAndExchangePolicyLayout(
  props: IReturnsAndExchangePolicyLayoutProps
) {
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"returns-and-exchange-policy"}>
        {props.children}
      </PageLayout>
    </Container>
  );
}
