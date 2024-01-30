import { Metadata } from "next";
import { Wallpapers } from "./components/Wallpapers";

export const metadata: Metadata = {
  title: "Inspiration - Wallpapers",
};
export default function Page() {
  return <Wallpapers />;
}
