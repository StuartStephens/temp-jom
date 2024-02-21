import { Metadata } from "next";
import { Container } from "react-bootstrap";
import {
  CONTACTENOS_FORM,
  ContactenosWithFormSupport,
  IContactenosForm,
} from "../components/ContactenosForm";

export const metadata: Metadata = {
  title: "Contact Us - Contactenos",
};
export default function Page() {
  return (
    <Container fluid className="page-gutter">
      <ContactenosWithFormSupport
        defaultForm={
          {
            FirstName: "",
            LastName: "",
            Email: "",
            CustomEmailSelection: "",
            WhatsOnYourMind: "",
          } as IContactenosForm
        }
        formConfiguration={{ formFields: CONTACTENOS_FORM }}
      />
    </Container>
  );
}
