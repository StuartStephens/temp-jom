import { ReturnsAndExchangePolicyLayout } from "./components/ReturnsAndExchangePolicyLayout";

export default function PrivacyPolicyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ReturnsAndExchangePolicyLayout>{children}</ReturnsAndExchangePolicyLayout>
  );
}
