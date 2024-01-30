import { Metadata } from "next";
import { BasicInformation } from "./BasicInformation";

export const metadata: Metadata = {
  title: "Basic Information",
};
export default function ManageAccountBasicInformationPage() {
  return <BasicInformation />;
}
