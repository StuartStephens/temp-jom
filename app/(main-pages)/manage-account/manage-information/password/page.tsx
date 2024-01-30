import { Metadata } from "next";
import { ChangePasswordBlock } from "../../../../components/ChangePasswordBlock";

export const metadata: Metadata = {
  title: "Change your Password",
};

export default function AccountPasswordPage() {
  return <ChangePasswordBlock />;
}
