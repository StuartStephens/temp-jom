import {
  PAGE_GUTTER,
  PageGutterLayout,
} from "../../components/shared/layouts/PageGutterLayout";
import { DemoMenu } from "./DemoMenu";

export default async function DemoLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <PageGutterLayout variant={PAGE_GUTTER.NONE}>
      <DemoMenu />
      {children}
    </PageGutterLayout>
  );
}
