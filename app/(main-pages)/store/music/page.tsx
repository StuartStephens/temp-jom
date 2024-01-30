import { Metadata } from "next";
import { redirect } from "next/navigation";
import { MusicListPage } from "./components/MusicListPage";

export const metadata: Metadata = {
  title: "Store - Music",
};
export default function Page() {
  return <MusicListPage />;
}
