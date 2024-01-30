import { StoreLayout } from "./components/StoreLayout";

export default function StorePageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // return <HomePageView pageData={pageData}>{children}</HomePageView>;
  return <StoreLayout>{children}</StoreLayout>;
}
