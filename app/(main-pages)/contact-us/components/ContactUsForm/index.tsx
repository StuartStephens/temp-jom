"use client";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import {
  FormField,
  VALIDATION_TYPES,
} from "../../../../contexts/utilities/FormSupport/FormSupportTypes";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../contexts/utilities/FormSupport/FormSupportContext";
import { hasErrors } from "../../../../contexts/utilities/FormSupport/FSUtils";
import { EnhancedTextArea } from "../../../../components/EnhancedTextArea";
import { FormErrors } from "../../../../contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../../../contexts/utilities/FormSupport/FormSupport";

export interface IContactUsFormProps {}

export const CONTACT_US_FORM: Map<string, FormField> = new Map<
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
    "CustomEmailSelection",
    {
      type: "text",
      defaultValue: "",
      validationProps: [],
    },
  ],
  [
    "WhatsOnYourMind",
    {
      type: "textarea",
      defaultValue: "",
      validationProps: [
        {
          validationType: VALIDATION_TYPES.REQUIRED,
          message: "Please tell us what is on your mind (text required)",
        },
      ],
    },
  ],
]);

export interface IContactUsForm {
  FirstName: string;
  LastName: string;
  Email: string;
  CustomEmailSelection: string;
  WhatsOnYourMind: string;
}

export function ContactUsForm(props: IContactUsFormProps) {
  const {
    form,
    errors,
    state,
    handleInputChange,
    handleInputBlur,
    handleSelectBlur,
    handleSelectChange,
    resetForm,
  } = useFormSupportContext();
  const [isLoading] = useState(false);

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
              <Form.Group as={Col} xs={12} md={6} className="mt-4">
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

              <Form.Group as={Col} xs={12} md={6} className="mt-4">
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
              <Form.Group as={Col} xs={12} md={6} className="mt-4">
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

              <Form.Group as={Col} xs={12} md={6} className="mt-4">
                <FloatingLabel
                  controlId="CustomEmailSelection"
                  label="Custom Email Selection Block"
                >
                  <Form.Select
                    id="CustomEmailSelection"
                    aria-label="Custom Email Selection Block"
                    value={form?.accountType || ""}
                    name="CustomEmailSelection"
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                  >
                    <option value="ANightOfHopeEvents">
                      A Night of Hope Events
                    </option>
                    <option value="Website">Website</option>
                    <option value="ProductRequests">Product Requests</option>
                    <option value="PrayerRequests">Prayer Requests</option>
                    <option value="Orders">Orders</option>
                    <option value="GeneralInformation">
                      General Information
                    </option>
                    <option value="Donations">Donations</option>
                    <option value="AccountInformation">
                      Account Information
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.CustomEmailSelection?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={12} md={12} className="mt-4">
                <EnhancedTextArea
                  controlId="WhatsOnYourMind"
                  maxCount={200}
                  required={true}
                  onMessageChanged={(
                    e: ChangeEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, WhatsOnYourMind: message };
                    handleInputChange(e, foo);
                  }}
                  onFieldBlurred={(
                    e: FocusEvent<HTMLInputElement>,
                    message
                  ) => {
                    const foo = { ...form, WhatsOnYourMind: message };
                    handleInputBlur(e, foo);
                  }}
                  //   value={form?.WhatsOnYourMind}
                  fieldLabel={`What's on Your Mind?`}
                />
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
                    Submit
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

type ContactUsFormFSProps = IContactUsFormProps & IFSContextInitializer;

export function ContactUsWithFormSupport(props: ContactUsFormFSProps) {
  const ContactUsFormFS = withFSContextFormSupport(ContactUsForm);
  return <ContactUsFormFS {...props}></ContactUsFormFS>;
}
