import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Inspiration",
  icons: ["https://int.joelosteen.com/Areas/Jom/img/favicon.ico"],
};

export default async function InspirationPage() {
  redirect("/inspiration/this-month");
}
