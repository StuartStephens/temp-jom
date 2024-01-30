import { ReactNode } from "react";
import { PageLayout } from "../../../../PageViews/PageLayout";
import { getPageData } from "../../../../PageViews/PageViewUtils";
import { Container } from "react-bootstrap";

export interface IStoreLayoutProps {
  children: ReactNode;
}

export async function StoreLayout(props: IStoreLayoutProps) {
  const pageData = await getPageData("product")
    .then((data) => {
      return data;
    })
    .catch((e) => {
      "SOMEHTING WENT WRONG with the page fetch";
    });
  return (
    <Container fluid className={`full-width`}>
      <PageLayout activePageId={"store"}>{props.children}</PageLayout>
    </Container>
  );
}
