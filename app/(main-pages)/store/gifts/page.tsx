import { Metadata } from "next";
import { redirect } from "next/navigation";
import { GiftListPage } from "./components/GiftListPage";

export const metadata: Metadata = {
  title: "Store - Gifts",
};
export default function Page() {
  return <GiftListPage />;
}
