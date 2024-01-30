import { CommunityLayout } from "./components/CommunityLayout";

export default async function CommunityPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <CommunityLayout>{children}</CommunityLayout>;
}
