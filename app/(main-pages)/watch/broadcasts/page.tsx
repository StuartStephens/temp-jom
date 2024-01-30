import { Metadata } from "next";
import { BroadcastsPage } from "./components/BroadcastsPage";

export const metadata: Metadata = {
  title: "Watch - Broadcasts",
};
export default function Page() {
  return <BroadcastsPage />;
}
