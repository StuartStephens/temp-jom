import { OurMinistryLayout } from "./components/OurMinistryLayout";

export default async function OurMinistryPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <OurMinistryLayout>{children}</OurMinistryLayout>;
}
