import { ForgotPasswordLayout } from "./components/ForgotPasswordLayout";

export default function PrivacyPolicyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <ForgotPasswordLayout>{children}</ForgotPasswordLayout>;
}
