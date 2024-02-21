import { SearchLayout } from "./components/SearchLayout";

export default function LandingPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // return <HomePageView pageData={pageData}>{children}</HomePageView>;
  return <SearchLayout>{children}</SearchLayout>;
}
