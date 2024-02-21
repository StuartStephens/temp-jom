import { Container } from "react-bootstrap";
import {
  CREATE_ACCOUNT_FORM,
  CreateAnAccountWithFormSupport,
  ICreateAnAccountForm,
} from "./CreateAnAccountForm";

export interface ICreateAnAccountLayoutProps {}

export function CreateAnAccountLayout(props: ICreateAnAccountLayoutProps) {
  return (
    <Container>
      <CreateAnAccountWithFormSupport
        formConfiguration={{ formFields: CREATE_ACCOUNT_FORM }}
        defaultForm={
          {
            FirstName: "",
            LastName: "",
            Email: "",
            GetTodaysWord: false,
            AgreeToTermsAndConditions: false,
          } as ICreateAnAccountForm
        }
      />
    </Container>
  );
}
