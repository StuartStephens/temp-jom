import { Metadata } from "next";
import { redirect } from "next/navigation";
import { FeaturedLayout } from "./FeaturedLayout";

export const metadata: Metadata = {
  title: "Store - Featured",
};
export default function Page() {
  return <FeaturedLayout />;
}
