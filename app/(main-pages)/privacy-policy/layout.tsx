import { PrivacyPolicyLayout } from "./components/PrivacyPolicyLayout";

export default function PrivacyPolicyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <PrivacyPolicyLayout>{children}</PrivacyPolicyLayout>;
}
