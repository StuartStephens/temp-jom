import { ManageSubscriptions } from "../../../../../app/components/ManageSubscriptions";
import { AccountLayout } from "../../../../../app/layouts/AccountLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
};
export default function AccountSubscriptionsPage() {
  return <ManageSubscriptions />;
}
