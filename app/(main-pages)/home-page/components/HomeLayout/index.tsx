import { ReactNode } from "react";
import { PageLayout } from "../../../../PageViews/PageLayout";
import { getPageData } from "../../../../PageViews/PageViewUtils";
import { HomePageBanner } from "./HomePageBanner";

export interface IHomeLayoutProps {
  children: ReactNode;
}

export async function HomeLayout(props: IHomeLayoutProps) {
  const pageData = await getPageData("home-page")
    .then((data) => {
      return data;
    })
    .catch((e) => {
      "SOMEHTING WENT WRONG with the page fetch";
    });
  return (
    <>
      <HomePageBanner pageData={pageData} />
      <PageLayout activePageId={"home-page"}>{props.children}</PageLayout>
    </>
  );
}
