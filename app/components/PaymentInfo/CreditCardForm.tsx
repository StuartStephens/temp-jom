import { ChangeEvent, FocusEvent, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import {
  CREDIT_CARD_BRAND_IMAGES,
  IPaymentMethod,
} from "../../contexts/Auth/PaymentMethodTypes";
import { FormErrors } from "../../contexts/utilities/FormSupport/FormErrors";
import {
  IFSContextInitializer,
  useFormSupportContext,
} from "../../contexts/utilities/FormSupport/FormSupportContext";
import {
  deepCopy,
  formatDateForPicker,
  hasErrors,
} from "../../contexts/utilities/FormSupport/FSUtils";
import { withFSContextFormSupport } from "../../contexts/utilities/FormSupport/FormSupport";
import { convertCreditCardFormToPaymentMethod } from ".";
import { useAuth } from "../../contexts/Auth/Context";

enum FORM_MODE {
  ADD = "ADD",
  EDIT = "EDIT",
}

export type ICreditCardForm = {
  cardId?: string;
  cardNumber?: string;
  nameOnCard?: string;
  expirationDate?: string;
  securityCode?: string;
  cardType?: string; //Visa, etc
};

export interface ICreditCardFormProps {
  mode: FORM_MODE;
  formData?: ICreditCardForm;
  onCancel: (formData: ICreditCardForm) => void;
  onSaveSuccess: (
    returnedData: IPaymentMethod
    // onSaveCallback?: (form: ICreditCardForm) => void
  ) => void;
}

export function CreditCardForm(props: ICreditCardFormProps) {
  const {
    state,
    handleInputChange,
    handleInputBlur,
    validateLocally,
    resetForm,
    initForm,
    isLoading,
    setIsLoading,
    handleSubmit,
  } = useFormSupportContext();
  const { fetchAPI, contactInfo } = useAuth();
  const { errors, form } = state;
  const { onSaveSuccess } = props;

  useEffect(() => {
    initializeForm();
    // eslint-disable-next-line
  }, []);

  function initializeForm() {
    dataFetched(); //TODO: this is just to spoof fetched data
  }

  function dataFetched() {
    const oData: any = {
      cardNumber: "",
      nameOnCard: "",
      expirationDate: "01/23", //formatDateForPicker(), //new Date().toISOString().split("T")[0],
      securityCode: "",
      cardType: "",
    };

    if (props.mode === FORM_MODE.ADD || !props.formData) {
      initForm(oData);
    } else {
      // let newVals: any = {};
      // for (const [key, value] of Object.entries(props.formData)) {
      //   newVals[key] = value; //.push({ name: key, value: value });
      // }

      initForm(props.formData);
    }
  }

  function handleCancel() {
    resetForm();

    if (form) {
      // let mapToForm: ICreditCardForm = Object.fromEntries(form.entries());
      let mapToForm: ICreditCardForm = form as ICreditCardForm;
      props.onCancel(mapToForm);
    }
  }

  // function postForm() {
  //   //PREP DATAfunction handleAddGiftToCart(amount: number) {

  //   if (form) {
  //     // let mapToForm: ICreditCardForm = Object.fromEntries(form.entries());
  //     let mapToForm: ICreditCardForm = form as ICreditCardForm;

  //     setTimeout(() => {
  //       props.onSave(mapToForm, () => {
  //         if (FORM_MODE.ADD === props.mode) {
  //           resetForm();
  //         } else {
  //           initForm(JSON.parse(JSON.stringify(form)));
  //         }
  //       });
  //     }, 3000);
  //   }
  // }

  const formSubmitProvider = () => {
    const newPaymentMethod: IPaymentMethod =
      convertCreditCardFormToPaymentMethod({ ...form });
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
    // const newForm = {
    //   cardNumber: "",
    //   nameOnCard: "",
    //   expirationDate: "01/23", //formatDateForPicker(), //new Date().toISOString().split("T")[0],
    //   securityCode: "",
    //   cardType: "",
    // };

    if (FORM_MODE.ADD === props.mode) {
      resetForm();
    } else {
      //initForm(JSON.parse(JSON.stringify(newForm)));
    }
    onSaveSuccess(data);
  };

  return (
    <div>
      {/* {JSON.stringify(errors)} */}
      <Form>
        <Container fluid className="full-width">
          <Row>
            <Col xs={0} md={1}></Col>

            <Col
              xs={3}
              md={2}
              className="d-flex flex-column justify-content-center"
            >
              <Image src={CREDIT_CARD_BRAND_IMAGES.VISA} width="60" />
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex flex-column justify-content-center"
            >
              <Image src={CREDIT_CARD_BRAND_IMAGES.MASTERCARD} width="60" />
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex flex-column justify-content-center"
            >
              <Image src={CREDIT_CARD_BRAND_IMAGES.AMEX} width="60" />
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex flex-column justify-content-center"
            >
              <Image src={CREDIT_CARD_BRAND_IMAGES.DISCOVER} width="60" />
            </Col>
            <Col
              xs={3}
              md={2}
              className="d-flex flex-column justify-content-center"
            >
              <Image src={CREDIT_CARD_BRAND_IMAGES.PAYPAL} width="60" />
            </Col>
            <Col xs={0} md={1}></Col>
          </Row>
          <Row>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="cardNumber" label="Card Number">
                <Form.Control
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  name="cardNumber"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e, form);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    handleInputBlur(e, form);
                  }}
                  value={state?.form?.cardNumber || ""}
                  isInvalid={hasErrors(errors, errors?.cardNumber)}
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength={19}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.cardNumber && errors?.cardNumber?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="nameOnCard" label="Name on Card">
                <Form.Control
                  type="text"
                  placeholder="Name on Card"
                  name="nameOnCard"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e, form);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    handleInputBlur(e, form);
                  }}
                  value={form?.nameOnCard || ""}
                  isInvalid={hasErrors(errors, errors?.nameOnCard)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.nameOnCard && errors?.nameOnCard?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6  mt-4">
              <FloatingLabel controlId="expirationDate" label="Expiration Date">
                <Form.Control
                  type="text"
                  placeholder="Expiration Date"
                  name="expirationDate"
                  pattern="\d{2}\d{2}"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e, form);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    handleInputBlur(e, form);
                  }}
                  // value={form?.expirationDate || formatDateForPicker()}
                  value={form?.expirationDate || "01/23"}
                  isInvalid={hasErrors(errors, errors?.expirationDate)}
                  required={true}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.expirationDate && errors?.expirationDate?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6 mt-4">
              <FloatingLabel controlId="securityCode" label="Security Code">
                <Form.Control
                  type="password"
                  placeholder="Security Code"
                  name="securityCode"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    handleInputChange(e, form);
                  }}
                  onBlur={(e: FocusEvent<HTMLInputElement>) => {
                    handleInputBlur(e, form);
                  }}
                  value={form?.securityCode || ""}
                  isInvalid={hasErrors(errors, errors?.securityCode)}
                  maxLength={3}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.securityCode && errors?.securityCode?.message}
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
    </div>
  );
}

type CCFSProps = ICreditCardFormProps & IFSContextInitializer;

export function CCWithFormSupport(props: CCFSProps) {
  const AddCreditCard = withFSContextFormSupport(CreditCardForm);
  return <AddCreditCard {...props}>Hello</AddCreditCard>;
}
