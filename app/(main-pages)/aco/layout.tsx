import { PageLayout } from "../../PageViews/PageLayout";

export default async function CommunityPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <PageLayout activePageId={"aco-page"}>{children}</PageLayout>;
}
