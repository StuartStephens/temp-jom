import { ReactNode } from "react";
import { PageLayout } from "../../../../PageViews/PageLayout";
import { Container } from "react-bootstrap";
import { AccountBanner } from "../../../../layouts/AccountLayout/AccountBanner";

export interface IAccountLayoutProps {
  children: ReactNode;
}

export function AccountLayout(props: IAccountLayoutProps) {
  return (
    <>
      <AccountBanner />
      {/* {pageData && pageData?.GenericHero && (
        <GenericPageBanner
          bannerProps={bannerProps}
          heading={pageData?.GenericHero?.Heading}
          iconClassName={getBannerIconClassNameByPageData(pageData)}
        />
      )} */}
      <Container fluid className={`full-width`}>
        <PageLayout activePageId={"manage-account"}>
          {props.children}
        </PageLayout>
      </Container>
    </>
  );
}
