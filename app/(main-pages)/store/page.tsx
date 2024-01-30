import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Store",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default async function StorePage() {
  return redirect("/store/featured");
}
