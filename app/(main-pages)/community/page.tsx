import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Community",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default function CommunityPage() {
  redirect("/community/prayer-wall");
}
