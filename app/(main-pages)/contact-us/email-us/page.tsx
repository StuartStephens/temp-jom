import { Metadata } from "next";
import {
  CONTACT_US_FORM,
  ContactUsForm,
  ContactUsWithFormSupport,
  IContactUsForm,
} from "../components/ContactUsForm";
import { Container } from "react-bootstrap";

export const metadata: Metadata = {
  title: "Contact Us - Email Us",
};
export default function Page() {
  return (
    <Container fluid className="page-gutter">
      <ContactUsWithFormSupport
        defaultForm={
          {
            FirstName: "",
            LastName: "",
            Email: "",
            CustomEmailSelection: "",
            WhatsOnYourMind: "",
          } as IContactUsForm
        }
        formConfiguration={{ formFields: CONTACT_US_FORM }}
      />
    </Container>
  );
}
