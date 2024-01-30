import {
  IPageData,
  getBannerClassNameByPageData,
} from "../../../../PageViews/PageViewUtils";
import { HomepageMastheadBlock } from "../../../../components/HomepageMastheadBlock";

export interface IHomePageBannerProps {
  pageData: IPageData;
}

export async function HomePageBanner(props: IHomePageBannerProps) {
  const { pageData } = props;
  return (
    <HomepageMastheadBlock
      {...(pageData?.BannerArea || {})}
      className={getBannerClassNameByPageData(pageData)}
    />
  );
}
