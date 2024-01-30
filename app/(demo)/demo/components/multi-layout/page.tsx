import { Metadata } from "next";
import { MultiColumnLayoutDemo } from "./MultiColumnLayoutDemo";

export const metadata: Metadata = {
  title: "MultiColumnLayoutDemo Explorer",
};
export default function Page() {
  return <MultiColumnLayoutDemo />;
}
