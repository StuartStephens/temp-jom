import { WatchLayout } from "./components/WatchLayout";

export default async function CommunityPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <WatchLayout>{children}</WatchLayout>;
}
