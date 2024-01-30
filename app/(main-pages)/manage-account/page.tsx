import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Manage Accounts",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default async function AccountPage() {
  redirect("/manage-account/dashboard");
}
