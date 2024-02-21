import { PaymentInfo } from "../../../../../app/components/PaymentInfo";
import { AccountLayout } from "../../../../../app/layouts/AccountLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Information",
};
export default function AccountPaymentInformationPage() {
  return <PaymentInfo />;
}
