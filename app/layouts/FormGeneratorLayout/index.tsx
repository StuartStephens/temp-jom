import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth/Context";
// import { IEmailAddress } from "../../apis/Account/EmailAddressTypes";
// import { deepCopy } from "../../utilities/FormSupport/FSUtils";
import { useFormSupportContext } from "../../contexts/utilities/FormSupport/FormSupportContext";
import { FormGenerator, IPostProps } from "./FormGenerator";

export interface IFormSubmissionProps {
  formPostProps?: IPostProps;
  remoteValidationPostProps?: IPostProps;
}

export interface IFormGeneratorLayoutProps { }

export function FormGeneratorLayout(props: IFormGeneratorLayoutProps) {
  const { contactInfo } = useAuth();
  const { state, form } = useFormSupportContext();
  const { formConfiguration: config } = state;
  const [formSubmissionProps, setFormSubmissionProps] =
    useState<IFormSubmissionProps>({});

  useEffect(() => { }, [form]);

  return (
    <div>
      <FormGenerator />
    </div>
  );
}

