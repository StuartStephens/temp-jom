import { Metadata } from "next";
import { ArchiveAccess } from "../../../components/shared/ArchiveAccess";

export const metadata: Metadata = {
  title: "Inspiration - Today's Word",
};
export default function Page() {
  return (
    <>
      <ArchiveAccess />
    </>
  );
}
