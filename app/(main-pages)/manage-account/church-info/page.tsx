import { redirect } from "next/navigation";

export default async function ManageAccountInformationPage() {
  redirect("/manage-account/church-info/general-information");
}
