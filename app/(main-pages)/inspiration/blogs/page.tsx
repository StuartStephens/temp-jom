import { Metadata } from "next";
import { Blogs } from "./components/Blogs";

export const metadata: Metadata = {
  title: "Inspiration - Blogs",
};
export default function Page() {
  return <Blogs />;
}
