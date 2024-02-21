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
import {
  FormField,
  VALIDATION_TYPES,
} from "../../../contexts/utilities/FormSupport/FormSupportTypes";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../contexts/utilities/FormSupport/FormSupportContext";
import { useAccountInfoContext } from "../../../contexts/AccountInformationContext/AccountInformationContext";
import { useCMColorModeProviderContext } from "../../../contexts/ColorModeContext/CMColorModeContext";
import { LoadingSpinner } from "../../LoadingSpinner";
import { FormErrors } from "../../../contexts/utilities/FormSupport/FormErrors";
import { hasErrors } from "../../../contexts/utilities/FormSupport/FSUtils";
import Link from "next/link";
import { withFSContextFormSupport } from "../../../contexts/utilities/FormSupport/FormSupport";

export interface ICreateAnAccountFormProps {}

export const CREATE_ACCOUNT_FORM: Map<string, FormField> = new Map<
  string,
  FormField
>([
  [
    "FirstName",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "First Name is Required",
        },
      ],
    },
  ],
  [
    "LastName",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Last Name is Required",
        },
      ],
    },
  ],
  [
    "Email",
    {
      type: "text",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.EMAIL_ADDRESS,
          message: "Email Address is Required",
        },
      ],
    },
  ],
  [
    "GetTodaysWord",
    {
      type: "text",
      defaultValue: "",
      validationProps: [],
    },
  ],
  [
    "AgreeToTermsAndConditions",
    {
      type: "checkbox",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message:
            "You must agree to to the Terms and Conditions before proceeding",
        },
      ],
    },
  ],
]);

export interface ICreateAnAccountForm {
  FirstName: string;
  LastName: string;
  Email: string;
  GetTodaysWord: boolean;
  AgreeToTermsAndConditions: boolean;
}

export function CreateAnAccountForm(props: ICreateAnAccountFormProps) {
  const { form, errors, state, handleInputChange, handleInputBlur, resetForm } =
    useFormSupportContext();
  const { emailAddresses, dashboardHero } = useAccountInfoContext();
  const { changeColorMode } = useCMColorModeProviderContext();
  const [isLoading, setIsLoading] = useState(false);

  function handleCancel() {
    resetForm();
  }

  function postForm() {
    alert(JSON.stringify(form));
    // if (form) {
    //   createAccount(form.Email, form.Password);
    // }
  }
  useEffect(() => {}, []);

  return (
    <Form>
      <Container fluid className="full-width ">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Container fluid className="full-width ">
            <Row>
              {/* <Col className="col-12 ">
                <h2>Create an Account</h2>
              </Col> */}
            </Row>
            <Row>
              <Form.Group as={Col} className="col-12   mt-4">
                <FloatingLabel controlId="FirstName" label="First Name">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="First Name"
                    name="FirstName"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.FirstName && form?.FirstName.length > 0
                        ? form?.FirstName
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.FirstName)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.FirstName?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="col-12   mt-4">
                <FloatingLabel controlId="LastName" label="Last Name">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Last Name"
                    name="LastName"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.LastName && form?.LastName.length > 0
                        ? form?.LastName
                        : ""
                    }
                    isInvalid={hasErrors(errors, errors?.LastName)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.LastName?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="col-12   mt-4">
                <FloatingLabel controlId="Email" label="Email">
                  <Form.Control
                    size="sm"
                    type="Email"
                    placeholder="Email"
                    name="Email"
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    // defaultValue={undefined}
                    value={
                      form?.Email && form?.Email.length > 0 ? form?.Email : ""
                    }
                    isInvalid={hasErrors(errors, errors?.Email)}
                    // required={true}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.Email?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>

            <Row>
              <Col className=" mt-4" xs={12} md={12}>
                <Form.Group controlId="GetTodaysWord">
                  <Form.Check
                    className="facet-checkbox"
                    inline
                    name="GetTodaysWord"
                    type="checkbox"
                    value={form?.GetTodaysWord || false}
                    onChange={handleInputChange}
                    onBlur={handleInputChange}
                  />
                  <Form.Label>
                    Get Today's Word Daily Devotional in your Inbox
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className=" mt-4" xs={12} md={12}>
                <Form.Group controlId="AgreeToTermsAndConditions">
                  <Form.Check
                    className="facet-checkbox"
                    inline
                    name="AgreeToTermsAndConditions"
                    type="checkbox"
                    value={form?.AgreeToTermsAndConditions || false}
                    onBlur={handleInputChange}
                  />

                  <Form.Label>
                    Agree to&nbsp;
                    <Link href="/terms-of-use" target="_NEW">
                      Terms and Conditions
                    </Link>
                  </Form.Label>
                </Form.Group>
              </Col>
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
                <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      postForm(); // for this one, we are just going to use the auth context login
                    }}
                  >
                    Login
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </Form>
  );
}

type CreateAnAccountFormFSProps = ICreateAnAccountFormProps &
  IFSContextInitializer;

export function CreateAnAccountWithFormSupport(
  props: CreateAnAccountFormFSProps
) {
  const CreateAnAccountFormFS = withFSContextFormSupport(CreateAnAccountForm);
  return <CreateAnAccountFormFS {...props}></CreateAnAccountFormFS>;
}
