"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { hasErrors } from "../../../../app/contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../../../app/contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../../../app/contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../app/contexts/utilities/FormSupport/FormSupportContext";
import {
  FormField,
  VALIDATION_TYPES,
} from "../../../../app/contexts/utilities/FormSupport/FormSupportTypes";

export interface IForgotPasswordFormProps {}

export const FORGOTPASSWORD_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "Email",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Email Address is Required",
        },
      ],
    },
  ],
]);

export interface IForgotPasswordForm {
  Email: string;
  //   Password: string;
}

export function ForgotPasswordForm(props: IForgotPasswordFormProps) {
  const [passwordRequested, setPasswordRequested] = useState(false);
  const {
    form,
    errors,
    state,
    handleInputChange,
    handleInputBlur,
    resetForm,
    validateLocally,
  } = useFormSupportContext();

  function handleCancel() {
    resetForm();
  }

  function postForm() {
    if (!validateLocally()) {
      return;
    }
    if (form) {
      setPasswordRequested(true);
      alert("submit form " + JSON.stringify(form));
    }
  }
  useEffect(() => {
    //setPasswordRequested(false)
  }, []);

  return (
    <Form className="forgot-password-form">
      <Container fluid className="page-gutter mb-5">
        <Row>
          <Col className="col-12 ">
            <h2>Email Address</h2>
          </Col>
        </Row>
        <Row>
          <Form.Group as={Col} xs={12} md={12} className=" mt-2">
            <FloatingLabel controlId="Email" label="Email">
              <Form.Control
                size="sm"
                type="Email"
                placeholder="Email"
                name="Email"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                // defaultValue={undefined}
                value={form?.Email && form?.Email.length > 0 ? form?.Email : ""}
                isInvalid={hasErrors(errors, errors?.Email)}
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                // required={true}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.Email?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        {errors && Object.values(errors).filter((o) => !!o).length > 0 && (
          <Row>
            <Col className="col-12 ">
              <FormErrors />
            </Col>
          </Row>
        )}
        <Row>
          <Col className="col-12 pt-3">
            <div className="button-row pb-2 d-flex flex-row gap-2 justify-content-left ">
              <Button
                variant="primary"
                onClick={() => {
                  // forgotpassword(form?.Email, form?.Password);
                  // forgotpassword(form.email, form.password);
                  postForm(); // for this one, we are just going to use the auth context forgotpassword
                }}
              >
                Reset my Password
              </Button>
            </div>
          </Col>
        </Row>
        {passwordRequested && (
          <Row>
            <Col>
              <p className="fs-3">
                Thank you for your request. If the email you entered corresponds
                to a valid user account, a password link will be sent to you.
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
}

type ForgotPasswordFSProps = IForgotPasswordFormProps & IFSContextInitializer;

export function ForgotPasswordWithFormSupport(props: ForgotPasswordFSProps) {
  const AddForgotPassword = withFSContextFormSupport(ForgotPasswordForm);
  return <AddForgotPassword {...props}></AddForgotPassword>;
}
