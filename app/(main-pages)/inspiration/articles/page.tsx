import { Metadata } from "next";
import { Articles } from "./components/Articles";

export const metadata: Metadata = {
  title: "Inspiration - Articles",
};
export default function Page() {
  return <Articles />;
}
