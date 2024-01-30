// import { IEmailAddress } from "../../apis/Account/EmailAddressTypes";
import { useAuth } from "../../contexts/Auth/Context";
import {
  FSBehaviors,
  IFSFormConfiguration,
} from "../../contexts/utilities/FormSupport/FSBehaviors";
import { CONTACT__EMAIL_ADDRESS_FIELDS } from "../../contexts/utilities/FormSupport/FormFieldPropConstants";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormGenerator } from "../FormGeneratorLayout/FormGenerator";

export interface ITestEmailFormProps { }

export function TestEmailForm(props: ITestEmailFormProps) {
  const { checkIsLoggedIn, contactInfo, login, fetchAPI } = useAuth();
  const { form, initForm } = useFormSupportContext();
  const formConfigProvider = (): IFSFormConfiguration => {
    let conf: IFSFormConfiguration = {
      formFields: CONTACT__EMAIL_ADDRESS_FIELDS,
      postFormEndpoint: "Contact/EmailAddress",
    };
    return conf;
  };

  return (
    <div>
      {checkIsLoggedIn() ? (
        <FormGenerator />
      ) : (
        // </FSBehaviors>
        <div>waiting for login</div>
      )}
    </div>
  );
}
