import { ReactNode } from "react";
import { PageDataProvider } from "../../../app/contexts/PageContext/Context";
import { IPageData, getPageData } from "../PageViewUtils";
import { StandardPageView } from "../StandardPageView/StandardPageView";

export interface IPageLayoutProps {
  children?: ReactNode;
  activePageId: string;
}

//get pageData
export async function PageLayout(props: IPageLayoutProps) {
  const { activePageId } = props;

  const pageData: IPageData | undefined = await getPageData(activePageId)
    .then((data) => {
      return data;
    })
    .catch((e) => {
      "SOMEHTING WENT WRONG with the page fetch";
    });
  if (!pageData) return <>no page data found</>;

  //KEEP TRACK OF TOP LEVEL MENU STATE
  return (
    <PageDataProvider defaultPageData={pageData}>
      <StandardPageView pageData={pageData}>{props.children}</StandardPageView>
    </PageDataProvider>
  );
}
