export default function LandingPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // return <HomePageView pageData={pageData}>{children}</HomePageView>;
  return <div>{children}</div>;
}
