import { ChangePasswordWithFormSupport } from "../../../app/components/ChangePassword";
import { IBankAccountForm } from "../../../app/components/PaymentInfo/BankAccountForm";
import { CHANGE_PASSWORD_FORM } from "../../../app/contexts/utilities/FormSupport/FormFieldPropConstants";

export interface IChangePasswordBlockProps {}

export function ChangePasswordBlock(props: IChangePasswordBlockProps) {
  return (
    <ChangePasswordWithFormSupport
      defaultForm={
        {
          currentPassword: undefined,
          newPassword: undefined,
          confirmPassword: undefined,
        } as IBankAccountForm
      }
      formConfiguration={{ formFields: CHANGE_PASSWORD_FORM }}
    />
  );
}
