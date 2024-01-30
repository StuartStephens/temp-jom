"use client";
import { ReactNode } from "react";

export interface IDashboardProps {
  children: ReactNode;
}

export function DashboardLayout(props: IDashboardProps) {
  return (
    <>HI</>
    // <Container fluid className={`full-width`}>
    //   <PageLayout activePageId={"manage-account"}>{props.children}</PageLayout>
    // </Container>
    // <>{props.children}</>
  );
}
