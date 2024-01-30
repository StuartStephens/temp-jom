import { DashboardLayout } from "./components/Dashboard/DashboardLayout";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
