import { Metadata } from "next";
import { PodcastsPage } from "./components/PodcastsPage";

export const metadata: Metadata = {
  title: "Watch - Podcasts",
};
export default function Page() {
  return <PodcastsPage />;
}
