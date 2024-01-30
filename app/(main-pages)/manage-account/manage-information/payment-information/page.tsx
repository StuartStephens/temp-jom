import { PaymentInfo } from "../../../../components/PaymentInfo";
import { AccountLayout } from "../../../../layouts/AccountLayout";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Information",
};
export default function AccountPaymentInformationPage() {
  return <PaymentInfo />;
}
