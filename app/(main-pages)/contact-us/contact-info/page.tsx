import { Metadata } from "next";

import { ContactInfo } from "./components/ContactInfo";

export const metadata: Metadata = {
  title: "Contact Us - Contact Info",
};
export default function Page() {
  return <ContactInfo />;
}
