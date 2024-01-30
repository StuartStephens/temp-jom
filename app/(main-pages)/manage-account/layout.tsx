import { AccountLayout } from "./components/AccountLayout";

export default function ManageAccountDashboardPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <AccountLayout>{children}</AccountLayout>;
}
