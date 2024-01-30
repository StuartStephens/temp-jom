import { Metadata } from "next";
import { ContactInformationBlock } from "../../../../components/ContactInformationBlock";

export const metadata: Metadata = {
  title: "Contact Information",
};
export default function AccountContactInformationPage() {
  return <ContactInformationBlock />;
}
