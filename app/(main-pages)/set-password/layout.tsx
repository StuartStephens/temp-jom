import { SetPasswordLayout } from "./components/SetPasswordLayout";

export default function PrivacyPolicyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <SetPasswordLayout>{children}</SetPasswordLayout>;
}
