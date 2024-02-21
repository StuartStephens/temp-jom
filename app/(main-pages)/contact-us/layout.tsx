import { ContactUsLayout } from "./components/ContactUsLayout";

export default async function ContactUsPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <ContactUsLayout>{children}</ContactUsLayout>;
}
