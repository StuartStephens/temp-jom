import { WhyGiveLayout } from "./components/WhyGiveLayout";

export default function LandingPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <WhyGiveLayout>{children}</WhyGiveLayout>;
}
