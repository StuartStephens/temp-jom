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
import { hasErrors } from "../../../../../app/contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../../../../app/contexts/utilities/FormSupport/FormErrors";
import { withFSContextFormSupport } from "../../../../../app/contexts/utilities/FormSupport/FormSupport";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../../../../app/contexts/utilities/FormSupport/FormSupportContext";
import {
  FormField,
  VALIDATION_TYPES,
} from "../../../../../app/contexts/utilities/FormSupport/FormSupportTypes";
import { EnhancedTextArea } from "../../../../components/EnhancedTextArea";
import { LoadingSpinner } from "../../../../components/LoadingSpinner";

export interface IContactenosFormProps {}

export const CONTACTENOS_FORM: Map<string, FormField> = new Map<
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
          message: "Se requiere el primer nombre",
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
          message: "Se requiere apellido",
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
          message: "Se requiere Dirección de correo electrónico",
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
          message: "Por favor díganos qué tiene en mente (se requiere texto)",
        },
      ],
    },
  ],
]);

export interface IContactenosForm {
  FirstName: string;
  LastName: string;
  Email: string;
  CustomEmailSelection: string;
  WhatsOnYourMind: string;
}

export function ContactenosForm(props: IContactenosFormProps) {
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
                <FloatingLabel controlId="FirstName" label="Primer Nombre">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Primer Nombre"
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
                <FloatingLabel controlId="LastName" label="Apellido">
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Apellido"
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
                <FloatingLabel controlId="Email" label="Correo electrónico">
                  <Form.Control
                    size="sm"
                    type="Email"
                    placeholder="Correo electrónico"
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
                  label="Bloque de selección de correo electrónico personalizado"
                >
                  <Form.Select
                    id="CustomEmailSelection"
                    aria-label="Bloque de selección de correo electrónico personalizado"
                    value={form?.accountType || ""}
                    name="CustomEmailSelection"
                    onChange={handleSelectChange}
                    onBlur={handleSelectBlur}
                  >
                    <option value="ANightOfHopeEvents">
                      Eventos de Una noche de esperanza
                    </option>
                    <option value="Website">Sitio web</option>
                    <option value="ProductRequests">
                      Solicitudes de productos
                    </option>
                    <option value="PrayerRequests">
                      Peticiones de oración
                    </option>
                    <option value="Orders">Orden de producto</option>
                    <option value="GeneralInformation">
                      Información general
                    </option>
                    <option value="Donations">Donaciones</option>
                    <option value="AccountInformation">
                      Información de la cuenta
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
                  fieldLabel={`Tu pregunta o comentario`}
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

type ContactenosFormFSProps = IContactenosFormProps & IFSContextInitializer;

export function ContactenosWithFormSupport(props: ContactenosFormFSProps) {
  const ContactenosFormFS = withFSContextFormSupport(ContactenosForm);
  return <ContactenosFormFS {...props}></ContactenosFormFS>;
}
