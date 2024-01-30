import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SeriesListPage } from "./components/SeriesListPage";

export const metadata: Metadata = {
  title: "Store - Series",
};
export default function Page() {
  return <SeriesListPage />;
}
