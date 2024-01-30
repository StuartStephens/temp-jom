import { ReactNode } from "react";
import {
  IImage,
  ILinkItemNode,
  IVideo,
} from "../components/cms/types/core/CoreTypes";

export interface IBannerArea {
  BackgroundImage?: IImage;
  LargeImage?: IImage;
  TabletImage?: IImage;
  MobileImage?: IImage;
  VideoLink?: IVideo;
  LineTwo?: string;
  LineThree?: string;
  Heading?: string;
  Links?: ILinkItemNode[];
  OverLay?: boolean;
}
export interface IGenericHero {
  DesktopImage?: IImage;
  // LargeImage?: IImage;
  // TabletImage?: IImage;
  // MobileImage?: IImage;
  // VideoLink?: IVideo;

  Heading?: string;
}

export interface IMainContent {
  ContentType?: string;
  Name: string;
  ContentLinkExpanded: any;
  MenuStateId: string;
}
export interface IPageData {
  id: string;
  Name: string;
  Title: string;
  ContentType: string;
  BannerArea?: IBannerArea;
  GenericHero?: IGenericHero;
  MainContent?: IMainContent[];
}

export interface IPageViewProps {
  children?: ReactNode;
  pageData: IPageData;
}

export async function getPageData(pageId: string) {
  try {
    const res = await fetch(`http://localhost:4000/jomapi/Page/${pageId}`, {
      next: {
        revalidate: 0, // seconds frequency of cache
      },
    });
    if (res.status !== 200) return;

    const menuItemStates = await res.json();
    return menuItemStates;
  } catch (e) {
    console.error("PAGE DATA NOT FOUND FOR ", pageId, e);
  } finally {
    //DONE
  }
  return;
}

export const getBannerIconClassNameByPageData = (
  pageData: IPageData | undefined
) => {
  switch (pageData?.Name) {
    case "Home":
      //HOME HAS NO ICON
      break;
    case "Our Ministry":
      return "icon-header-our-ministry";
    // break;
    case "Inspiration":
      return "icon-header-inspiration";
    // break;
    case "Account":
      return "bi-person-circle";
    // break;

    default:
      return "icon-header-our-ministry";
  }
};
// export const getBannerImageBackgroundByPageData = (pageData: IPageData) => {
//   switch (pageData.Name) {
//     case "Home":
//       return "http://joelosteen.com//globalassets/Images/Jom/AllChannelOffers/2023-09-Bless-Yourself/hero-banner-overlay.png";
//     //   break;
//     case "Our Ministry":
//       return "https://int.joelosteen.com/globalassets/images/jom/our-ministry/jom_ourministry/largedisplay.jpg";
//     // break;
//     case "Account":
//       return "https://int.joelosteen.com/globalassets/images/jom/our-ministry/jom_ourministry/largedisplay.jpg";
//     // break;

//     default:
//       return "http://joelosteen.com//globalassets/Images/Jom/AllChannelOffers/2023-09-Bless-Yourself/hero-banner-overlay.png";
//   }
// };
export const getBannerClassNameByPageData = (
  pageData: IPageData | undefined
) => {
  // if (!pageData) return "";
  switch (pageData?.Name) {
    case "Home Page":
      return "home-page";
      break;
    case "Our Ministry":
      return "our-ministry-page";
    case "Inspiration":
      return "inspiration-menu-inspiration";
    // break;

    case "Account":
      return "account-page";
    case "Store":
      return "store";

    default:
      return "";
  }
};
