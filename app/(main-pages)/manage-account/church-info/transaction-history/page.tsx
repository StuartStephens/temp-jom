import { Metadata } from "next";
import { ChurchSelector } from "../general-information/components/ChurchSelector";
import { IChurch } from "../../../../components/FindChurchesContainer/SearchForChurch";
import { ViewTransactions } from "./components/ViewTransactions";

export const metadata: Metadata = {
  title: "Church Info - Transaction History",
};
export default function ChurchInfoTransactionHistoryPage() {
  // return <BasicInformation />;
  return <ViewTransactions />;
}
