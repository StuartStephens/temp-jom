import { Metadata } from "next";
import { ACOPageLayout } from "../../layouts/ACOPageLayout";

export const metadata: Metadata = {
  title: "Special Offer",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default async function ACOPage() {
  return <ACOPageLayout />;
}
