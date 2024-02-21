import { Metadata } from "next";
import { ChurchInfoViewDonations } from "./components/ChurchInfoViewDonations";

export const metadata: Metadata = {
  title: "Church Info - Manage Donations",
};
export default function ChurchInfoManageDonationsPage() {
  // return <BasicInformation />;
  return (
    <div>
      <ChurchInfoViewDonations />
    </div>
  );
}
