import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { useEffect } from "react";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";

import { convertBankAccountFormToPaymentMethod } from ".";
import { useAuth } from "../../contexts/Auth/Context";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";
import { hasErrors } from "../../contexts/utilities/FormSupport/FSUtils";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import { IPaymentMethod } from "../../contexts/Auth/PaymentMethodTypes";
enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export type IBankAccountForm = {
  acctID?: string;
  bankName?: string;
  accountType?: string;
  routingNumber?: string;
  accountNumber?: string;
};
export interface IBankAccountFormProps {
  mode: FORM_MODE;
  formData?: IBankAccountForm;
  onCancel: (formData: IBankAccountForm) => void;
  onSaveSuccess: (
    data: IPaymentMethod
    // formData: IBankAccountForm,
    // onSaveCallback?: (form: IBankAccountForm) => void
  ) => void;
}

export function BankAccountForm(props: IBankAccountFormProps) {
  const {
    state,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectBlur,
    resetForm,
    initForm,
    handleSubmit,
  } = useFormSupportContext();
  const { fetchAPI, contactInfo } = useAuth();

  const { errors, form } = state;
  const { onSaveSuccess } = props;

  const formSubmitProvider = () => {
    const newPaymentMethod: IPaymentMethod =
      convertBankAccountFormToPaymentMethod({ ...form });
    return fetchAPI(
      "Contact/PaymentMethod",
      {
        Method: newPaymentMethod, //IPaymentMethod,
        BillingAddress: contactInfo?.DefaultBillingAddress,
      },
      "POST"
    );
  };

  const formSubmitSuccessProvider = (data: IPaymentMethod) => {
    const newForm = {
      acctID: "",
      bankName: "",
      accountType: "Checking",
      routingNumber: "",
    };
    if (FORM_MODE.ADD === props.mode) {
      resetForm();
    } else {
      initForm(JSON.parse(JSON.stringify(newForm)));
    }
    onSaveSuccess(data);
  };

  useEffect(() => {
    // initializeContext(defaultForm, formConfigProvider, undefined, undefined);
    // eslint-disable-next-line
  }, []);

  function handleCancel() {
    resetForm();
    props.onCancel(form);
  }

  return (
    <div>
      <Form>
        <Container fluid className="full-width">
          <Row>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="bankName" label="Bank Name">
                <Form.Control
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.bankName || ""}
                  isInvalid={hasErrors(errors, errors?.bankName)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.bankName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="accountType" label="Account Type">
                <Form.Select
                  id="accountType"
                  aria-label="Account Type"
                  value={form?.accountType || ""}
                  name="accountType"
                  onChange={handleSelectChange}
                  onBlur={handleSelectBlur}
                >
                  <option value="Checking">Checking</option>
                  <option value="Savings">Savings</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors?.accountType?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel
                controlId="routingNumber"
                label="Bank Routing Number"
              >
                <Form.Control
                  type="text"
                  placeholder="Bank Routing Number"
                  name="routingNumber"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.routingNumber || ""}
                  isInvalid={hasErrors(errors, errors?.routingNumber)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.routingNumber?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel
                controlId="accountNumber"
                label="Bank Account Number"
              >
                <Form.Control
                  type="text"
                  placeholder="Bank Account Number"
                  name="accountNumber"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.accountNumber || ""}
                  isInvalid={hasErrors(errors, errors?.accountNumber)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.accountNumber?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
          </Row>
          <FormErrors />
          {/* {errors && Object.values(errors).filter((o) => !!o).length > 0 && (
            <Row>
              <Col className="col-12 ">
              
              </Col>
            </Row>
          )} */}
          <Row>
            <Col className="col-12 pt-5">
              <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
                <Button variant="outline-primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleSubmit(formSubmitProvider, formSubmitSuccessProvider);
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
      {/* </FSBehaviors> */}
    </div>
  );
}

type BankAccountFSProps = IBankAccountFormProps & IFSContextInitializer;

export function BankAccountWithFormSupport(props: BankAccountFSProps) {
  const AddBankAccount = withFSContextFormSupport(BankAccountForm);
  return <AddBankAccount {...props}></AddBankAccount>;
}
