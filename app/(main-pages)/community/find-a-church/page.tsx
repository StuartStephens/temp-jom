import { Metadata } from "next";
import { FindChurchesContainer } from "../../../components/FindChurchesContainer";

export const metadata: Metadata = {
  title: "Community - Find a Church",
};
export default function Page() {
  return <FindChurchesContainer />;
}
