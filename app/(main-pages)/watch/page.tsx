import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Watch",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default async function WatchPage() {
  redirect("/watch/messages");
}
