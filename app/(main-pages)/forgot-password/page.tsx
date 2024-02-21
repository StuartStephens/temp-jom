import { Metadata } from "next";
import { Container } from "react-bootstrap";
import {
  FORGOTPASSWORD_FORM,
  ForgotPasswordWithFormSupport,
} from "./components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};
export default function Page() {
  return (
    <Container fluid className="">
      <ForgotPasswordWithFormSupport
        formConfiguration={{ formFields: FORGOTPASSWORD_FORM }}
        defaultForm={{
          Email: "",
        }}
      />
    </Container>
  );
}
