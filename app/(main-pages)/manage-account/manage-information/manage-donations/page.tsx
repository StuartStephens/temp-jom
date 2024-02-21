"use-client";
import { ManageDonations } from "../../../../../app/components/ManageDonations";

import { Metadata } from "next";
import { useAccountInfoContext } from "../../../../contexts/AccountInformationContext/AccountInformationContext";

export const metadata: Metadata = {
  title: "Manage Donations",
};
export default function AccountManageDonationsPage() {
  return <ManageDonations churchId={undefined} />;
}
