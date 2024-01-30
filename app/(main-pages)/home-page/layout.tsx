import { HomeLayout } from "./components/HomeLayout";

export default function LandingPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // return <HomePageView pageData={pageData}>{children}</HomePageView>;
  return <HomeLayout>{children}</HomeLayout>;
}
