"use-client";
import { ManageDonations } from "../../../../components/ManageDonations";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Donations",
};
export default function AccountManageDonationsPage() {
  return <ManageDonations />;
}
