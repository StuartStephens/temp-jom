"use client";
import { ReactNode, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MENU_TYPE, Menu } from "../../../app/components/navigation/Menu";
import { useUIStateContext } from "../../../app/contexts/UIStateContext/Context";
import { ShareYourStoryForm } from "../../components/ShareYourStoryForm";
import { ACO66IntroBlock } from "../../components/cms/block/ACO66IntroBlock";
import { ACOCarouselAdBlock } from "../../components/cms/block/ACOCarouselAdBlock";
import { ACOOfferBlock } from "../../components/cms/block/ACOOfferBlock";
import { ACOSignatureBlock } from "../../components/cms/block/ACOSignatureBlock";
import { AboutUsContentBlock } from "../../components/cms/block/AboutUsContentBlock";
import { AccountDashboardBlock } from "../../components/cms/block/AccountDashboardBlock";
import { CommunityBlock } from "../../components/cms/block/CommunityBlock";
import { FeaturedBlogsBlock } from "../../components/cms/block/FeaturedBlogsBlock";
import { FeaturedContentCarouselBlock } from "../../components/cms/block/FeaturedContentCarouselBlock";
import { FullWidthImageRowBlock } from "../../components/cms/block/FullWidthImageRowBlock";
import { HighlightedNavigationBlock } from "../../components/cms/block/HighlightedNavigationBlock";
import { InspirationalMessageBlock } from "../../components/cms/block/InspirationalMessageBlock";
import { LastMessagesBlock } from "../../components/cms/block/LastMessagesBlock";
import { PastArticlesBlock } from "../../components/cms/block/PastArticlesBlock";
import { PastBlogsBlock } from "../../components/cms/block/PastBlogsBlock";
import { PastDevotionalsBlock } from "../../components/cms/block/PastDevotionalsBlock";
import { PastMessagesBlock } from "../../components/cms/block/PastMessagesBlock";
import { PrayerBlock } from "../../components/cms/block/PrayerBlock";
import { RichTextRowBlock } from "../../components/cms/block/RichTextRowBlock";
import { ShoutOfPraiseBlock } from "../../components/cms/block/ShoutOfPraiseBlock";
import { SocialMediaLinksBlock } from "../../components/cms/block/SocialMediaLinksBlock";
import { TodaysWordFormBlock } from "../../components/cms/block/TodaysWordFormBlock";
import { WatchPageCountdownBlock } from "../../components/cms/block/WatchPageCountdownBlock";
import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../components/shared/layouts/PageGutterLayout";
import { IMainContent, IPageData, getPageData } from "../PageViewUtils";
import { ACOMastheadBlock } from "../../components/cms/block/ACOMastheadBlock";
import { CTA5050Block } from "../../components/cms/block/CTA5050Block";
import { NightOfHopeBlock } from "../../components/cms/block/NightOfHopeBlock";
import { ContactUsInstructionsBlock } from "../../components/cms/block/ContactUsInstructionsBlock";
import { QuestionAndAnswerGroupBlock } from "../../components/cms/block/QuestionAndAnswerGroupBlock";
import { VideoRowBlock } from "../../components/cms/block/VideoRowBlock";

export interface IMainContentsProps {
  contentPageData: IPageData | undefined;
  children: ReactNode;
}

const MainContentsBlockChooser = (content: IMainContent) => {
  switch (content.ContentType) {
    case "InPageNavigationBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className="mb-5">
          <Menu
            level={2}
            menuStateName={content?.MenuStateId}
            menuType={MENU_TYPE.TAB_MENU}
            onMenuSelect={(eventKey: string) => {}}
          />
        </PageGutterLayout>
      ) : null;
    case "FullWidthImageRowBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className="mt-4 mb-4 ">
          <FullWidthImageRowBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;

    case "WatchPageCountdownBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className="mt-0 mb-0 ">
          <WatchPageCountdownBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ACOCarouselAdBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className=" ">
          <ACOCarouselAdBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "FeaturedContentCarouselBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className="">
          <FeaturedContentCarouselBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "AccountDashboardBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout variant={PAGE_GUTTER.NONE} className="mt-4 mb-4 ">
          <AccountDashboardBlock />
        </PageGutterLayout>
      ) : null;
    case "AboutUsContentBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="mt-4 mb-4  ">
          <AboutUsContentBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "RichTextRowBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="mt-4 mb-4 ">
          <RichTextRowBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "HighlightedNavigationBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <HighlightedNavigationBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "TodaysWordFormBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <TodaysWordFormBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "InspirationalMessageBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <InspirationalMessageBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "LastMessagesBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <LastMessagesBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "CommunityBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <CommunityBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "FeaturedBlogsBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <FeaturedBlogsBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "PastMessagesBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <PastMessagesBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "PastArticlesBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <PastArticlesBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "PastBlogsBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <PastBlogsBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "PastDevotionalsBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <PastDevotionalsBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "SocialMediaLinksBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <SocialMediaLinksBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ShoutsOfPraiseBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ShoutOfPraiseBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "PrayerBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <PrayerBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ShareYourStoryFormBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ShareYourStoryForm {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ACOSignatureBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ACOSignatureBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ACO66IntroBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ACO66IntroBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ACOOfferBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ACOOfferBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "CTA5050Block":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <CTA5050Block {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ACOMastheadBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ACOMastheadBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "NightOfHopeBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <NightOfHopeBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "ContactUsInstructionsBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <ContactUsInstructionsBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "QuestionAndAnswerGroupBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <QuestionAndAnswerGroupBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    case "VideoRowBlock":
      return content.ContentLinkExpanded ? (
        <PageGutterLayout className="" variant={PAGE_GUTTER.NONE}>
          <VideoRowBlock {...content.ContentLinkExpanded} />
        </PageGutterLayout>
      ) : null;
    default:
      return null;
  }
};

export function MainContents(props: IMainContentsProps) {
  const { contentPageData } = props;
  const { getActiveKey, menuStates } = useUIStateContext();
  const [contentData, setContentData] = useState<IPageData>();

  async function getSomeData() {
    let contentKey = getActiveKey("state-" + contentPageData?.id);
    if (!contentKey) contentKey = contentPageData?.id; //fallback to the base menuitemstate
    if (!contentKey) return;

    const jsondata = await getPageData(contentKey)
      .then((data) => {
        setContentData(data);
      })
      .catch((e) => {
        console.error("SOMEHTING WENT WRONG with the page fetch");
      });
  }
  useEffect(() => {
    getSomeData();
  }, []);
  useEffect(() => {
    getSomeData();
  }, [contentPageData, menuStates]);

  {
    JSON.stringify(contentData);
  }
  if (contentData && contentData.MainContent) {
    return (
      <Container className="full-width " fluid>
        {contentData?.MainContent.map((o: IMainContent, index: number) => {
          return (
            <div key={o.ContentType + "+" + o.Name + "_" + index}>
              {MainContentsBlockChooser(o)}
            </div>
          );
        })}
        {props.children}
      </Container>
    );
  }

  return <>NO PAGE CONTENT</>;
}
