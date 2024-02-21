import { TermsOfUsePolicyLayout } from "./components/TermsOfUseLayout";

export default function PrivacyPolicyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <TermsOfUsePolicyLayout>{children}</TermsOfUsePolicyLayout>;
}
