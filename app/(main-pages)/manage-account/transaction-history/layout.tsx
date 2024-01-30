import { TransactionHistoryLayout } from "./components/TransactionHistory/TransactionHistoryLayout";

export default function TransactionHistoryPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <TransactionHistoryLayout>{children}</TransactionHistoryLayout>;
}
