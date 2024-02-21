import { useEffect, useRef } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import { useAccountInfoContext } from "../../contexts/AccountInformationContext/AccountInformationContext";
import { FIELD_REF_ACTIONS } from "../../contexts/utilities/FormSupport/FSReducers";
import {
  deepCopy,
  hasErrors,
} from "../../contexts/utilities/FormSupport/FSUtils";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import {
  FieldReference,
  useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";

export type IAddressForm = {
  id?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
  isPrimary?: boolean;
  isDefaultBilling?: boolean;
  isDefaultShipping?: boolean;
};

export enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export interface IAddressFormProps {
  mode: FORM_MODE;
  formData?: IAddressForm;
  onCancel: (formData: IAddressForm) => void;
  onSave: (
    formData: IAddressForm,
    onSaveCallback: (form: IAddressForm) => void
  ) => void;
}

export function AddressForm(props: IAddressFormProps) {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const address1 = useRef(null);
  const address2 = useRef(null);
  const city = useRef(null);
  const zipCode = useRef(null);

  const { countries, states, setSelectedCountry, setSelectedState } =
    useAccountInfoContext();
  const {
    form,
    errors,
    initForm,
    handleInputBlur,
    handleInputChange,
    handleSelectBlur,
    handleSelectChange,
    resetForm,
    validateLocally,
    dispatch,
    handleSubmit,
    // formFieldsProps,
    // setFieldRefs,
    // fieldRefs,
  } = useFormSupportContext();

  useEffect(() => {
    // initializeForm();

    let frs: FieldReference[] = [];

    dispatch({
      type: FIELD_REF_ACTIONS.SET_STATE,
      payload: [
        { name: "firstName", value: firstName },
        { name: "lastName", value: lastName },
        { name: "address1", value: address1 },
        { name: "address2", value: address2 },
        { name: "city", value: city },
        { name: "zipCode", value: zipCode },
        { name: "address1", value: address1 },
      ],
    });
    // setFieldRefs([
    //   { name: "firstName", value: firstName },
    //   { name: "lastName", value: lastName },
    //   { name: "address1", value: address1 },
    //   { name: "address2", value: address2 },
    //   { name: "city", value: city },
    //   { name: "zipCode", value: zipCode },
    //   { name: "address1", value: address1 },
    // ]);
    // eslint-disable-next-line
  }, []);

  function initializeForm(): void {
    const oData: IAddressForm = {
      id: "",
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      country: "USA",
      city: "",
      state: "VI",
      zipCode: "",
      isDefaultBilling: false,
      isDefaultShipping: false,
      isPrimary: false,
    } as IAddressForm;

    if (props.mode === FORM_MODE.ADD || !props.formData) {
      initForm(oData);
      setSelectedCountry(oData?.country || "USA");
    } else {
      initForm(props.formData);
      setSelectedCountry(props?.formData?.country || "USA");
    }
  }

  function handleCancel() {
    resetForm();

    if (form) {
      // let mapToForm: ICreditCardForm = Object.fromEntries(form.entries());
      let mapToForm: IAddressForm = form as IAddressForm;
      props.onCancel(mapToForm);
    }
  }

  function postForm() {
    props.onSave(deepCopy(form), (newValue: IAddressForm) => {
      if (FORM_MODE.ADD === props.mode) {
        resetForm();
      } else {
        initForm(JSON.parse(JSON.stringify(newValue)));
      }
    });
  }

  return (
    <div>
      <Form>
        <Container fluid className="full-width">
          <Row>
            <input type="hidden" id="id" name="id" value={form?.id || ""} />

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="firstName" label="First Name">
                <Form.Control
                  ref={firstName}
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.firstName || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.firstName)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors(errors, errors?.firstName) &&
                    errors?.firstName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="lastName" label="Last Name">
                <Form.Control
                  ref={lastName}
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.lastName || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.lastName)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lastName && errors?.lastName?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="address1" label="Address 1">
                <Form.Control
                  ref={address1}
                  type="text"
                  placeholder="Address 1"
                  name="address1"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.address1 || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.address1)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address1 && errors?.address1?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="address2" label="Address 2">
                <Form.Control
                  ref={address2}
                  type="text"
                  placeholder="Address 2"
                  name="address2"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.address2 || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.address2)}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.address2?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {countries && (
              <Form.Group as={Col} className="col-12 col-md-6 mt-3">
                <FloatingLabel controlId="country" label="Country">
                  <Form.Select
                    id="country"
                    name="country"
                    aria-label="Select Country"
                    onChange={(e) => {
                      handleSelectChange(e);
                      setSelectedCountry(e.target.value);
                    }}
                    onBlur={handleSelectBlur}
                    value={
                      form?.country ||
                      (countries && countries[0]?.Iso3Code) ||
                      "USA"
                    }
                    // defaultValue={countries && countries[0].Iso3Code}
                  >
                    {countries.map((c) => (
                      <option
                        key={c.Name}
                        value={c.Iso3Code}
                        // selected={c.Iso2Code === "USA"}
                      >
                        {c.Name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="city" label="City">
                <Form.Control
                  ref={city}
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.city || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.city)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.city && errors?.city?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            {states && (
              <Form.Group as={Col} className="col-12 col-md-6 mt-3">
                <FloatingLabel controlId="state" label="State">
                  <Form.Select
                    id="state"
                    name="state"
                    aria-label="Select State"
                    onChange={(e) => {
                      handleSelectChange(e);
                      setSelectedState(e.target.value);
                    }}
                    onBlur={(e) => {
                      handleSelectChange(e);
                      setSelectedState(e.target.value);
                    }}
                    value={
                      form?.state || (states && states[0]?.Iso2Code) || "VI"
                    }
                    // defaultValue={states && states[0].Iso2Code}
                    // defaultValue={form.state || "VI"}
                  >
                    {states.map((c) => (
                      <option key={c.Name} value={c.Iso2Code}>
                        {c.Name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            )}

            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="zipCode" label="Zip Code">
                <Form.Control
                  ref={zipCode}
                  type="text"
                  placeholder="Zip Code"
                  name="zipCode"
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  value={form?.zipCode || ""}
                  // defaultValue={""}
                  isInvalid={hasErrors(errors, errors?.zipCode)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.zipCode && errors?.zipCode?.message}
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
            <Col className="col-12 ">
              <div className="button-row pb-5 d-flex flex-row gap-2 justify-content-start">
                <Button variant="outline-primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (validateLocally()) {
                      postForm();
                    }
                  }}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
