"use client";
import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { PageLayout } from "../../../../../PageViews/PageLayout";

export interface ITransactionHistoryLayoutProps {
  children: ReactNode;
}

export function TransactionHistoryLayout(
  props: ITransactionHistoryLayoutProps
) {
  return (
    <>{props.children}</>
    // <Container fluid className={`full-width`}>
    //   <PageLayout activePageId={"manage-account"}>{props.children}</PageLayout>
    // </Container>
  );
}
