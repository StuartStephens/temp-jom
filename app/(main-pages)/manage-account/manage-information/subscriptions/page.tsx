import { ManageSubscriptions } from "../../../../components/ManageSubscriptions";
import { AccountLayout } from "../../../../layouts/AccountLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscriptions",
};
export default function AccountSubscriptionsPage() {
  return <ManageSubscriptions />;
}
