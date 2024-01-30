import { Inspiration } from "./Inspiration";

export default async function InspirationPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Inspiration>{children}</Inspiration>;
}
